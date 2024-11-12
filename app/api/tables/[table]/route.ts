import { getInforme } from "@/app/lib/actions"
import { type NextRequest } from "next/server"
import * as XLSX from 'xlsx'

export async function GET(
    request: NextRequest,
    { params }: { params: { table: string } }
) {

    // Check auth & permission here

    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get('format')

    try {
        const { table } = params

        if (!table) throw new Error('Table name required')

        // Pseudo-code steps:
        // 1. GET all table names from db

        // 2. Find the table that matches the param

        // 3. If table name doesn't exist, throw error 

        // 4. If it does exist, use the matching table name 
        // for the proper case
        const tableName = "Matriculas"

        // 5. Query the table data from database
        // ** Using static data in this example

        // Loading example data 
        const tableMatriculas = await getInforme();


        const matriculasSheet = XLSX.utils.json_to_sheet(tableMatriculas)

        if (format === 'xlsx') {
            const workbook = XLSX.utils.book_new()

            XLSX.utils.book_append_sheet(workbook, matriculasSheet, 'Dash')

            const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" })

            return new Response(buf, {
                status: 200,
                headers: {
                    'Content-Disposition': `attachment; filename="${tableName}.xlsx"`,
                    'Content-Type': 'application/vnd.ms-excel',
                }
            })
        }
        else {

            const html = XLSX.utils.sheet_to_html(matriculasSheet)

            return new Response(html, {
                status: 200,
                headers: {
                    'Content-Type': 'text/html',
                }
            })
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e)
            return new Response(e.message, {
                status: 400,
            })
        }
    }
}