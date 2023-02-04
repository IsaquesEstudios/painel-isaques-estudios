function Status(value: string | undefined) {
  if (value === 'approved') {
    return ('aprovado')
  } else {
    return ('pendente')
  }
}

export { Status }