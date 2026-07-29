import type { CollectionAfterChangeHook } from 'payload'
import { createCrmLead } from '@/utilities/odoo'

export const syncToOdoo: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  const submissionData: { field: string; value: string }[] = doc.submissionData || []

  const fieldMap: Record<string, string> = {}
  for (const entry of submissionData) {
    fieldMap[entry.field] = entry.value
  }

  const name = fieldMap['full-name'] || fieldMap['name'] || fieldMap['fullName'] || 'Website Lead'
  const email = fieldMap['email'] || ''
  const phone = fieldMap['phone'] || fieldMap['telephone'] || ''
  const message = fieldMap['message'] || fieldMap['description'] || ''

  let formTitle = ''
  if (doc.form && typeof doc.form === 'object' && 'title' in doc.form) {
    formTitle = doc.form.title
  }

  const leadFields: Record<string, unknown> = {
    name: `${formTitle || 'Website'} - ${name}`,
    contact_name: name,
    email_from: email,
    phone: phone,
    description: message,
    type: 'lead',
  }

  try {
    const leadId = await createCrmLead(leadFields)
    req.payload.logger.info(`[Odoo] CRM lead created (ID: ${leadId}) for submission ${doc.id}`)
  } catch (error) {
    req.payload.logger.error(`[Odoo] Failed to create CRM lead for submission ${doc.id}: ${error}`)
  }

  return doc
}
