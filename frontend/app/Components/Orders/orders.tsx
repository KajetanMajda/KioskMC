import { useEffect, useMemo, useState } from 'react';

interface OrderItemType {
  name: string;
  quantity: number;
  price: number;
}

interface OrderType {
  orderNumber: string;
  total: number;
  date: string;
  items: OrderItemType[];
}

const Orders = () => {
  const [data, setData] = useState<OrderType[]>([]);

  useEffect(() => {
    fetch('http://localhost:3030/orders/info')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const salesByDate = useMemo(() => {
    const salesMap = new Map<string, number>();

    data.forEach(order => {
      const orderDate = new Date(order.date);
      const formattedDate = orderDate.toISOString().split('T')[0]; // Format daty: YYYY-MM-DD

      if (salesMap.has(formattedDate)) {
        salesMap.set(formattedDate, salesMap.get(formattedDate)! + order.total);
      } else {
        salesMap.set(formattedDate, order.total);
      }
    });

    const salesArray: { date: string; total: number }[] = [];
    salesMap.forEach((total, date) => {
      salesArray.push({ date, total });
    });

    return salesArray;
  }, [data]);

  return (
    <div>
      <h2>Sales Statistics</h2>
      {salesByDate.map((sale, index) => (
        <div key={index}>
          <h3>Date: {sale.date}</h3>
          <p>Total Sales: {sale.total} €</p>
        </div>
      ))}
      {data.map((order: OrderType) => (
        <div key={order.orderNumber}>
          <h3>Order Number: {order.orderNumber}</h3>
          <p>Total: {order.total} €</p>
          <p>Date: {order.date}</p>
          <ul>
            {order.items.map((item: OrderItemType) => (
              <li key={item.name}>
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price} €</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
