import AddToBasketButton from '@/components/AddToBasketButton';
// import { Button } from '@/components/ui/button';
import { imageUrl } from '@/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

export const dynamic = "force-static"
export const revalidate = 60 
const ProductPage = async({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const product = await getProductBySlug(slug)
    if (!product) {
        return <div>Product not found</div>;
      }
    const isOutOfStock = product.stock != null && product.stock <=0;
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className={`relative aspect-square rounded-lg shadow-lg overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}>
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url() || '/placeholder.png'}
            alt={product.name || 'Product Image'}
            fill
            
          />
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out Of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div>
        <h1 className="text-3xl font-bold mb-4">
            {product.name}
        </h1>
        <div className="text-3xl font-semibold mb-4">
            ${product.price?.toFixed(2)}
        </div>
        <div className="prose max-w-none mb-6">
            {Array.isArray(product.description) && (
                <PortableText value={product.description}/>
            )}
        </div>
        </div>
        <div className='mt-6'>
          <div> 
            <AddToBasketButton product={product} disabled={isOutOfStock}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ProductPage