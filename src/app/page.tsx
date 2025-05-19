// src/app/page.tsx
import Banner from "../components/section/Banner";
import Categories from "@/components/section/Categories";
import FeaturedProducts from "@/components/section/FeaturedProducts";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Banner />
      <Categories />
      <FeaturedProducts />
    </div>
  );
}
