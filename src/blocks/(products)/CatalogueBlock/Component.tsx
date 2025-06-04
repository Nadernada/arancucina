import type { CatalogueBlock as CatalogueBlockType } from '@/payload-types'
import PdfReader from './PdfReader'
// import { PdfReader } from './PdfReader'

export const CatalogueBlock: React.FC<CatalogueBlockType> = ({ pdf }) => {
  return (
    <div className="container">
      <h2 className="text-black font-bodoni uppercase text-4xl">Catalogue</h2>
      <PdfReader pdfUrl={(pdf as { url: string }).url} />
    </div>
  )
}
