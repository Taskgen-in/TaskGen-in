import B2 from "backblaze-b2";

export async function authorizeB2() {
 const b2 = new B2({
  applicationKeyId: '005e1aba0b732620000000001',
  applicationKey: 'K005dz1l89+TGzAQd8k1bNZzx56dp7Q'
});
  console.log("=== B2 ENV DEBUG ===");
console.log('B2_KEY_ID:', JSON.stringify(process.env.B2_KEY_ID));
console.log('B2_APP_KEY:', JSON.stringify(process.env.B2_APP_KEY));
console.log("====================");


  await b2.authorize(); // This must resolve before using b2 API
  return b2;
}
