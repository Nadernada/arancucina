const ODOO_URL = process.env.ODOO_URL
const ODOO_DB = process.env.ODOO_DB
const ODOO_USERNAME = process.env.ODOO_USERNAME
const ODOO_PASSWORD = process.env.ODOO_PASSWORD

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

async function jsonRpc(url: string, method: string, params: unknown): Promise<unknown> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method,
      params,
    }),
  })

  const data: OdooRpcResponse = await response.json()

  if (data.error) {
    throw new Error(`Odoo RPC Error: ${data.error.data?.message || data.error.message}`)
  }

  return data.result
}

async function authenticate(): Promise<number> {
  if (!ODOO_URL || !ODOO_DB || !ODOO_USERNAME || !ODOO_PASSWORD) {
    throw new Error('Missing Odoo environment variables (ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD)')
  }

  const uid = await jsonRpc(`${ODOO_URL}/jsonrpc`, 'call', {
    service: 'common',
    method: 'authenticate',
    args: [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}],
  })

  if (!uid || typeof uid !== 'number') {
    throw new Error('Odoo authentication failed: invalid credentials')
  }

  return uid
}

export async function createCrmLead(fields: Record<string, unknown>): Promise<number> {
  const uid = await authenticate()

  const leadId = await jsonRpc(`${ODOO_URL}/jsonrpc`, 'call', {
    service: 'object',
    method: 'execute_kw',
    args: [
      ODOO_DB,
      uid,
      ODOO_PASSWORD,
      'crm.lead',
      'create',
      [fields],
    ],
  })

  if (!leadId || typeof leadId !== 'number') {
    throw new Error('Odoo failed to create CRM lead')
  }

  return leadId
}
