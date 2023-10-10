import React, { useEffect, useState } from 'react'
import { H1, H2, Table, TableHead, TableBody, TableRow, TableCell } from '@adminjs/design-system'
import { ApiClient, useCurrentAdmin } from 'adminjs'

export default function Dashboard() {
  const [currentAdmin] = useCurrentAdmin()// UsecurrentAdmin pega o usuario atual
  const [resources, setResources] = useState<{ [key: string]: number }>()
  const api = new ApiClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    const res = await api.getDashboard()
    console.log(res.data) // Mostra todas as propriedades que temos cadastradas  

    setResources(res.data) // Assim que ocorrer a chamada da api setar todos os valores em resources que é um useState
  }

  return (
    <section style={{ padding: '1.5rem' }}>
      <H1>Seja bem-vindo, {currentAdmin?.firstName}!</H1>

      <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#FF0043' }}>
              <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
              <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              resources ?
                Object.entries(resources).map(([resource, count]) => (
                  <TableRow key={resource}>
                    <TableCell>{resource}</TableCell>
                    <TableCell>{count}</TableCell>
                  </TableRow>
                ))
                :
                <></>
            }
          </TableBody>
        </Table>
      </section>
    </section>
  )
}