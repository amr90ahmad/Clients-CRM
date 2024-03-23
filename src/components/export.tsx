// "use client";
// import * as XLSX from "xlsx";
// import { Button } from "./ui/button";

// export default function Export({ data }: { data: any }) {
//     const exportToExcel = () => {
//         const wb = XLSX.utils.book_new();

//         data.clients.forEach((client, index) => {
//             let balance = 0;
//             const wsData = [
//                 ["Name:", client.name],
//                 ["Code:", client.code],
//                 ["Reg:", client.reg],
//                 ["Address:", client.address],
//                 ["Phone:", client.phone],
//                 [],
//                 ["Date", "Service", "Comment", "Cost", "Payment", "Balance"],
//             ];

//             client.transactions.forEach((transaction) => {
//                 const row = [
//                     transaction.date || "",
//                     transaction.service || "",
//                     transaction.comment || "",
//                     transaction.cost || 0,
//                     transaction.payment || 0,
//                     Number(transaction.cost) -
//                         Number(transaction.payment) +
//                         balance,
//                 ];
//                 wsData.push(row);
//             });

//             const ws = XLSX.utils.aoa_to_sheet(wsData);
//             XLSX.utils.book_append_sheet(wb, ws, client.name);
//         });

//         XLSX.writeFile(wb, "clients_data.xlsx");
//     };

//     return (
//         <>
//             <Button
//                 className={`${isMobile && "mx-auto"}`}
//                 onClick={exportToExcel}
//             >
//                 Export to Excel
//             </Button>
//         </>
//     );
// }
