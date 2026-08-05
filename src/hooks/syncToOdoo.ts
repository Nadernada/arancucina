import type { CollectionAfterChangeHook } from 'payload'
import { createOdooLead, type OdooLeadData } from '@/utilities/odoo'

export const syncToOdoo: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation !== 'create') return doc

  req.payload.logger.info(`[Odoo] New form submission received (ID: ${doc.id})`)

  const submissionData: { field: string; value: string }[] = doc.submissionData || []

  const fieldMap: Record<string, string> = {}
  for (const entry of submissionData) {
    fieldMap[entry.field] = entry.value
  }

  req.payload.logger.info(`[Odoo] Submission fields: ${JSON.stringify(fieldMap)}`)

  let formTitle = ''
  if (doc.form && typeof doc.form === 'object' && 'title' in doc.form) {
    formTitle = doc.form.title
  }

  const leadData: OdooLeadData = {
    name: fieldMap['full-name'] || fieldMap['name'] || fieldMap['firstName'] || '',
    lastname: fieldMap['last-name'] || fieldMap['lastname'] || fieldMap['lastName'] || '',
    email: fieldMap['email'] || '',
    phone: fieldMap['phone'] || fieldMap['telephone'] || '',
    subject:
      fieldMap['message'] ||
      fieldMap['subject'] ||
      fieldMap['description'] ||
      formTitle ||
      'Demande depuis le site',
  }

  req.payload.logger.info(`[Odoo] Lead data: ${JSON.stringify(leadData)}`)

  try {
    const leadId = await createOdooLead(leadData)
    req.payload.logger.info(`[Odoo] CRM lead created (ID: ${leadId}) for submission ${doc.id}`)
  } catch (error) {
    req.payload.logger.error(`[Odoo] Failed to create CRM lead for submission ${doc.id}: ${error}`)
  }

  return doc
}
