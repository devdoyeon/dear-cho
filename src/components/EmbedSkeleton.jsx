// iframe 로드 전까지 보여줄 펄스 애니메이션 스켈레톤

const EmbedSkeleton = ({ className = '' }) => (
  <div className={`embed-skeleton ${className}`} aria-hidden='true' />
)

export default EmbedSkeleton
