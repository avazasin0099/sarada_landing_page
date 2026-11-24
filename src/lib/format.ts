/** ₹ amount in Bengali numerals, e.g. ₹৫৯৯ */
export const taka = (n: number) => "₹" + n.toLocaleString("bn-IN");
export const bnNum = (n: number) => n.toLocaleString("bn-IN");
