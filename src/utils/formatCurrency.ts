export const formatCurrency = (valor: number | undefined) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format;
  try {
    if (valor) return formatter(valor);
    throw new Error("Valor não informado");
  } catch (error) {
    return formatter(0);
  }
};
