export function getDeliveryDate(days = 0) {
  const today = new Date();
  today.setDate(today.getDate() + days);

  const formatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  });

  return `${formatted}`;
}
