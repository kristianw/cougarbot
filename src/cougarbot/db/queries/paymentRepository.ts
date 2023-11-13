import { db } from "../database";
import { Payment, NewPayment, PaymentUpdate } from "../interfaces";

export async function findPayments(): Promise<Payment[]> {
    const query = db.selectFrom('payment')
    return await query.selectAll().execute();
}

export async function getPaymentIndex(): Promise<Payment> {
    return await db.selectFrom('payment')
    .selectAll()
    .where('id', '=', 1)
    .executeTakeFirstOrThrow()
}

export async function createPayment(payment: NewPayment): Promise<Payment> {
    return await db.insertInto('payment')
    .values({
        paymentIndex: payment.paymentIndex,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function updatePayment(paymentIndex: number, payment: PaymentUpdate): Promise<void> {
    await db.updateTable('payment').set(payment).where('paymentIndex', '=', paymentIndex).execute()
}