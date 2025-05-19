"use client";

import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from "@/services/fakeStoreApi";
import { Card, Row, Col, Spin, Typography, Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { Product } from "@/types/interface";
import Image from "next/image";
import Link from "next/link";

const { Title, Text } = Typography;

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params); // Unwrap the params object
  const dispatch = useDispatch();

  // Fetch product details
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  // Fetch related products (products from the same category)
  const { data: relatedProducts } = useGetProductsByCategoryQuery(
    product?.category || ""
  );

  // Add to cart functionality
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product)); // Dispatch the addToCart action
      alert("Product added to cart!"); // Show success message
    }
  };

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Error fetching product details</div>;

  return (
    <div style={{ padding: "24px" }}>
      {/* Product Details */}
      <Row
        gutter={[
          { xs: 6, sm: 16, md: 32, lg: 32 },
          { xs: 16, sm: 16, md: 32, lg: 32 },
        ]}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ position: "relative", width: "100%", height: "500px" }}>
            <Image
              src={product?.image}
              alt={product?.title}
              width={400}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Title level={2}>{product?.title}</Title>
          <Text
            strong
            style={{ fontSize: "24px", display: "block", marginBottom: "16px" }}
          >
            ${product?.price}
          </Text>
          <Text style={{ display: "block", marginBottom: "16px" }}>
            {product?.description}
          </Text>
          <Text
            type="secondary"
            style={{ display: "block", marginBottom: "16px" }}
          >
            Category: {product?.category}
          </Text>
          <Button type="primary" size="large" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
      {/* Related Products Section */}
      <Title level={3} style={{ marginTop: "48px" }}>
        Related Products
      </Title>
      <Row
        gutter={[
          { xs: 6, sm: 16, md: 32, lg: 32 },
          { xs: 16, sm: 16, md: 32, lg: 32 },
        ]}
      >
        {relatedProducts
          ?.filter((p: Product) => p.id !== product?.id) // Exclude the current product
          .map((relatedProduct: Product) => (
            <Col
              key={relatedProduct.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              flex={"auto"}
            >
              <Link href={`/products/${relatedProduct.id}`} passHref>
                <Card
                  hoverable
                  cover={
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                      }}
                    >
                      <Image
                        alt={relatedProduct.title}
                        src={relatedProduct.image}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={relatedProduct.title}
                    description={`$${relatedProduct.price}`}
                  />
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </div>
  );
}
