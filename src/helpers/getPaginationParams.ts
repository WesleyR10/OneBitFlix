export function getPaginationParams(query: any): [page: number, perPage: number] {
  
  const { page, perPage } = query  // Paginação

const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
  ? parseInt(perPage, 10)
  : 10 // Caso nao tenha nehuma quantidade especifica vai ser 10 cateogiras

const pageNumber = typeof page === 'string' && parseInt(page, 10) > 0
  ? parseInt(page, 10)
  : 1

  return [pageNumber, perPageNumber]
}

