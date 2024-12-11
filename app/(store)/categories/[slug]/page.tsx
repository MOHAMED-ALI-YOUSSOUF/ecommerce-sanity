import ProductsView from '@/components/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getProductByCategory } from '@/sanity/lib/products/getProductByCategory';

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const products = await getProductByCategory(slug); // Renommé de `product` à `products` pour clarifier
  const categories = await getAllCategories(); // Appelé la fonction correctement

  if (!products) {
    return <div>Product not found</div>;
  }

  // const isOutOfStock = products.some((product) => product.stock != null && product.stock <= 0); // Vérification du stock pour plusieurs produits
  
  return (
    <div className='flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Correction du formatage du slug
            .join(" ")}
          {" "}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
