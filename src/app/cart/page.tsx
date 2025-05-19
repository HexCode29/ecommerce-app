// src/app/cart/page.tsx
"use client";

import { Card, Row, Col, Typography, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { removeFromCart, clearCart } from "@/store/cartSlice";
import { Product } from "@/types/interface";
import Image from "next/image";

const { Title, Text } = Typography;

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // Remove product from cart functionality
  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId)); // Dispatch the removeFromCart action
  };

  // Clear cart functionality
  const handleClearCart = () => {
    dispatch(clearCart()); // Dispatch the clearCart action
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Your Cart</Title>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {cartItems.map((product: Product) => (
              <Col key={product.id} span={24}>
                <Card>
                  <Row align="middle" gutter={16}>
                    <Col>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={100}
                        height={100}
                        style={{ objectFit: "contain" }}
                      />
                    </Col>
                    <Col flex={1}>
                      <Title level={4}>{product.title}</Title>
                      <Text>${product.price}</Text>
                    </Col>
                    <Col>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleRemoveFromCart(product.id)}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
          <Button
            type="primary"
            danger
            style={{ marginTop: "16px" }}
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </>
      )}
    </div>
  );
}
