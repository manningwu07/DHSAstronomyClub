import React from 'react'

interface ShootingStarTrailProps {
  fromLeft: boolean
  className?: string
}

const ShootingStarTrail: React.FC<ShootingStarTrailProps> = ({ fromLeft, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 30"  // Keep this larger than the star size
      className={className}
      style={{
        transform: fromLeft ? 'scaleX(1)' : 'scaleX(-1)',  // Flip trail orientation
        width: '100px',        // Set a fixed size independent of the star 
        height: 'auto',        // Maintain aspect ratio
      }}
    >
      <defs>
        <linearGradient id="trailGradient" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="20%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d="M5,15 Q100,0 195,15 Q100,30 5,15 Z"
        fill="url(#trailGradient)"
      />
    </svg>
  )
}

export default ShootingStarTrail