const ODOO_URL = process.env.ODOO_URL
const ODOO_DB = process.env.ODOO_DB
const ODOO_LOGIN = process.env.ODOO_LOGIN
const ODOO_API_KEY = process.env.ODOO_API_KEY

interface OdooRpcResponse {
  jsonrpc: string
  id: number
  result?: unknown
  error?: {
    code: number
    message: string
    data: { message: string }
  }
}

export interface OdooLeadData {
  name: string
  lastname: string
  email: string
  phone: string
  subject: string
}

async function createOdooLead(data: OdooLeadData): Promise<number> {
  if (!ODOO_DB || !ODOO_URL) {
    throw new Error('Missing Odoo environment variables (ODOO_DB, ODOO_URL)')
  }

  if (!ODOO_LOGIN || !ODOO_API_KEY) {
    throw new Error('Missing Odoo environment variables (ODOO_LOGIN, ODOO_API_KEY)')
  }

  // 1. Authentication
  const authRes = await fetch(ODOO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'common',
        method: 'login',
        args: [ODOO_DB, ODOO_LOGIN, ODOO_API_KEY],
      },
    }),
  }).then((r) => r.json() as Promise<OdooRpcResponse>)

  if (authRes.error) {
    throw new Error(`Odoo auth failed: ${authRes.error.data?.message || authRes.error.message}`)
  }

  const uid = authRes.result as number
  if (!uid) {
    throw new Error('Odoo authentication failed: invalid credentials')
  }

  // 2. Create lead
  const leadRes = await fetch(ODOO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          ODOO_DB,
          uid,
          ODOO_API_KEY,
          'crm.lead',
          'create',
          [
            {
              name: `Contact site - ${data.subject}`,
              contact_name: `${data.name} ${data.lastname}`,
              email_from: data.email,
              phone: data.phone,
              description: data.subject,
            },
          ],
        ],
      },
    }),
  }).then((r) => r.json() as Promise<OdooRpcResponse>)

  if (leadRes.error) {
    throw new Error(
      `Odoo lead creation failed: ${leadRes.error.data?.message || leadRes.error.message}`,
    )
  }

  const leadId = leadRes.result as number

  return leadId
}

export { createOdooLead }
