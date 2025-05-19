// src/app/categories/[category]/page.tsx
"use client";

import { useGetProductsByCategoryQuery } from "@/services/fakeStoreApi";
import { Product } from "@/types/interface";
import {
  Card,
  Row,
  Col,
  Spin,
  Pagination,
  Select,
  Slider,
  Typography,
} from "antd";
import Image from "next/image";
import { useState } from "react";
import React from "react";

const { Title } = Typography;
const { Option } = Select;

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("price");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { category } = React.use(params);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(category);

  // Pagination
  const pageSize = 8; // Number of products per page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter products by price range
  const filteredProducts = products?.filter(
    (product: Product) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Sort products
  const sortedProducts = filteredProducts?.sort((a: Product, b: Product) => {
    if (sortBy === "price") {
      return a.price - b.price;
    } else if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Paginated products
  const paginatedProducts = sortedProducts?.slice(startIndex, endIndex);

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Error fetching products</div>;

  return (
    <div style={{ padding: 16 }}>
      <Title
        level={2}
        style={{ textAlign: "center", textTransform: "capitalize" }}
      >
        {decodeURIComponent(category)}
      </Title>
      {/* Sorting and Filtering Options */}
      <div className="filters-container">
        <div>
          <span>Sort By: </span>
          <Select
            defaultValue="price"
            style={{ width: 120 }}
            onChange={(value) => setSortBy(value)}
          >
            <Option value="price">Price</Option>
            <Option value="name">Name</Option>
          </Select>
        </div>

        <div>
          <span>Price Range: </span>
          <Slider
            range
            min={0}
            max={1000}
            defaultValue={[0, 1000]}
            style={{ width: 200 }}
            onChange={(value) => setPriceRange(value)}
          />
        </div>
      </div>

      {/* Product List */}
      <Row
        gutter={[
          { xs: 6, sm: 16, md: 32, lg: 32 },
          { xs: 16, sm: 16, md: 32, lg: 32 },
        ]}
      >
        {paginatedProducts?.map((product: Product) => (
          <Col
            key={product.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            xl={6}
            flex={"auto"}
          >
            <Card
              bordered
              hoverable
              cover={
                <Image
                  alt={product.title}
                  src={product.image}
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                />
              }
            >
              <Card.Meta
                title={product.title}
                description={`$${product.price}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
      {/* Pagination */}
      <div style={{ marginTop: "24px", textAlign: "center" }}>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredProducts?.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
