// Minimal fake data to drive the local demo. Swap for a real API later.

export type Account = {
  id: string
  name: string
  number: string
  balance: number
  currency: "PEN" | "USD"
}

export type Movement = {
  id: string
  title: string
  date: string
  amount: number
}

export const accounts: Account[] = [
  {
    id: "acc-1",
    name: "Cuenta Sueldo",
    number: "•••• 4821",
    balance: 3450.75,
    currency: "PEN",
  },
  {
    id: "acc-2",
    name: "Cuenta Ahorro USD",
    number: "•••• 1290",
    balance: 1200.0,
    currency: "USD",
  },
]

export const movements: Movement[] = [
  { id: "m-1", title: "Plin a María", date: "28 jun", amount: -50 },
  { id: "m-2", title: "Abono de sueldo", date: "27 jun", amount: 3200 },
  { id: "m-3", title: "Supermercado", date: "26 jun", amount: -184.3 },
  { id: "m-4", title: "Recarga celular", date: "25 jun", amount: -30 },
]

export function formatCurrency(value: number, currency: "PEN" | "USD") {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency,
  }).format(value)
}
