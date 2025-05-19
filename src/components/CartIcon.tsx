// src/components/CartIcon.tsx
'use client';

import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CartIcon = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Link href="/cart" passHref>
      <Badge count={cartItems.length} showZero>
        <ShoppingCartOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
      </Badge>
    </Link>
  );
};

export default CartIcon;