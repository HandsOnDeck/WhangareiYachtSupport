import { SITE } from "./constants";
import { formatCurrency } from "./utils";

interface InvoicePDFData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  yachtName?: string;
  billingAddress?: string;
  lineItems: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  gstAmount: number;
  discountAmount: number;
  total: number;
  notes?: string;
}

export function generateInvoiceHTML(data: InvoicePDFData): string {
  const lineItemsHTML = data.lineItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.unitPrice)}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.total)}</td>
      </tr>
    `
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Invoice ${data.invoiceNumber}</title>
  <style>
    body { font-family: 'Georgia', serif; color: #0A2540; margin: 0; padding: 40px; }
    .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
    .logo { font-size: 28px; font-weight: bold; color: #0A2540; }
    .invoice-title { font-size: 36px; color: #2E86AB; margin: 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #0A2540; color: white; padding: 12px; text-align: left; }
    .totals { margin-top: 20px; text-align: right; }
    .totals table { width: 300px; margin-left: auto; }
    .bank-details { margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">${SITE.name}</div>
      <p>${SITE.address}<br/>${SITE.phone}<br/>${SITE.email}<br/>GST: ${SITE.gstNumber}</p>
    </div>
    <div style="text-align: right;">
      <h1 class="invoice-title">INVOICE</h1>
      <p><strong>${data.invoiceNumber}</strong></p>
      <p>Issue Date: ${data.issueDate}</p>
      <p>Due Date: ${data.dueDate}</p>
    </div>
  </div>

  <div style="margin-bottom: 30px;">
    <h3>Bill To:</h3>
    <p><strong>${data.customerName}</strong><br/>
    ${data.customerEmail}<br/>
    ${data.billingAddress || ""}<br/>
    ${data.yachtName ? `Yacht: ${data.yachtName}` : ""}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align: center;">Qty</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Total</th>
      </tr>
    </thead>
    <tbody>${lineItemsHTML}</tbody>
  </table>

  <div class="totals">
    <table>
      <tr><td>Subtotal:</td><td style="text-align: right;">${formatCurrency(data.subtotal)}</td></tr>
      ${data.discountAmount > 0 ? `<tr><td>Discount:</td><td style="text-align: right;">-${formatCurrency(data.discountAmount)}</td></tr>` : ""}
      <tr><td>GST (15%):</td><td style="text-align: right;">${formatCurrency(data.gstAmount)}</td></tr>
      <tr style="font-size: 18px; font-weight: bold;"><td>Total:</td><td style="text-align: right;">${formatCurrency(data.total)}</td></tr>
    </table>
  </div>

  ${data.notes ? `<div style="margin-top: 30px;"><h3>Notes:</h3><p>${data.notes}</p></div>` : ""}

  <div class="bank-details">
    <h3>Payment Details</h3>
    <p><strong>Bank:</strong> ${SITE.bankName}<br/>
    <strong>Account:</strong> ${SITE.bankAccount}<br/>
    <strong>Reference:</strong> ${data.invoiceNumber}</p>
  </div>
</body>
</html>`;
}
