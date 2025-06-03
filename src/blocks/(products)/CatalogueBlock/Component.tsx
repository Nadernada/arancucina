import type { CatalogueBlock as CatalogueBlockType } from '@/payload-types'
import PdfReader from './PdfReader'
// import { PdfReader } from './PdfReader'

export const CatalogueBlock: React.FC<CatalogueBlockType> = ({ pdf }) => {
  return (
    <div className="container">
      <PdfReader pdfUrl={(pdf as { url: string }).url} />
    </div>
  )
}
