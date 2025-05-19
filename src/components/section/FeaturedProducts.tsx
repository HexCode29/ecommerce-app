// src/components/FeaturedProducts.tsx
"use client"; // Mark this component as a Client Component

import { useGetProductsQuery } from "@/services/fakeStoreApi";
import { Product } from "@/types/interface";
import { Card, Row, Col, Spin } from "antd";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Error fetching products</div>;

  return (
    <Row
      gutter={[
        { xs: 6, sm: 16, md: 32, lg: 32 },
        { xs: 16, sm: 16, md: 32, lg: 32 },
      ]}
    >
      {products?.map((product: Product) => (
        <Col
          key={product.id}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={6}
          flex={"auto"}
        >
          <Link href={`/products/${product.id}`} passHref>
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
                    alt={product.title}
                    src={product.image}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              }
            >
              <Card.Meta
                title={product.title}
                description={`$${product.price}`}
              />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default FeaturedProducts;
