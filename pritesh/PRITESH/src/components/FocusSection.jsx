import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Database, Monitor, Palette } from 'lucide-react';

const TechIcon = ({ icon, color, size = 120 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
            animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
            }}
            exit={{ opacity: 0, scale: 1.6, rotate: 30 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
            style={{ color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: `drop-shadow(0 0 22px ${color}bb)` }}
        >
            {React.createElement(icon, { size })}
        </motion.div>
    );
};

const TechOrbit = ({ currentTech, techs, isMobile }) => {
    const orbitRadius = isMobile ? 100 : 138;
    const centerSize  = isMobile ? 60  : 90;
    const orbitIconSz = isMobile ? 18  : 24;
    const NUM = 6;
    const { color: activeColor, icon: ActiveIcon } = techs[currentTech];

    // pick 6 icons that are NOT the current active one
    const orbitTechs = React.useMemo(() =>
        techs.filter((_, i) => i !== currentTech).slice(0, NUM),
    [currentTech, techs]);

    return (
        <div style={{
            position: 'relative',
            width:  orbitRadius * 2 + 80,
            height: orbitRadius * 2 + 80,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
        }}>

            {/* ── outer decorative static ring ── */}
            <div style={{
                position: 'absolute',
                width:  orbitRadius * 2 + 40,
                height: orbitRadius * 2 + 40,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.04)',
            }} />

            {/* ── dashed orbit ring (rotates) ── */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    width:  orbitRadius * 2,
                    height: orbitRadius * 2,
                    borderRadius: '50%',
                    border: `1px dashed ${activeColor}44`,
                }}
            />

            {/* ── orbiting icons ── */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    width:  orbitRadius * 2,
                    height: orbitRadius * 2,
                }}
            >
                {orbitTechs.map((tech, i) => {
                    const angle = (i / NUM) * 2 * Math.PI - Math.PI / 2;
                    const x = orbitRadius * Math.cos(angle);
                    const y = orbitRadius * Math.sin(angle);
                    const boxSz = orbitIconSz + 22;
                    return (
                        <motion.div
                            key={i}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top:  '50%',
                                width:  boxSz,
                                height: boxSz,
                                marginLeft: -boxSz / 2 + x,
                                marginTop:  -boxSz / 2 + y,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `${tech.color}18`,
                                borderRadius: '50%',
                                border: `1px solid ${tech.color}55`,
                                color: tech.color,
                                backdropFilter: 'blur(6px)',
                                boxShadow: `0 0 14px ${tech.color}40, inset 0 0 6px ${tech.color}20`,
                            }}
                        >
                            {React.createElement(tech.icon, { size: orbitIconSz })}
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* ── outer pulsing glow ── */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.45, 0.08, 0.45] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    width:  centerSize + 60,
                    height: centerSize + 60,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${activeColor}66, transparent 70%)`,
                    zIndex: 3,
                }}
            />

            {/* ── center platform ── */}
            <motion.div
                key={`platform-${currentTech}`}
                animate={{ borderColor: [`${activeColor}88`, `${activeColor}cc`, `${activeColor}88`] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    width:  centerSize + 16,
                    height: centerSize + 16,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(255,255,255,0.07), rgba(0,0,0,0.6))`,
                    border: `1.5px solid ${activeColor}88`,
                    boxShadow: `0 0 35px ${activeColor}55, inset 0 0 18px rgba(0,0,0,0.6)`,
                    zIndex: 4,
                }}
            />

            {/* ── central icon ── */}
            <div style={{ position: 'relative', zIndex: 5 }}>
                <AnimatePresence mode="wait">
                    <TechIcon
                        key={currentTech}
                        icon={techs[currentTech].icon}
                        color={activeColor}
                        size={centerSize * 0.62}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};


const JSIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm16.525 13.83c-.35-.58-.81-1.07-1.37-1.46-.3-.21-.62-.39-.96-.53l.31-.7c.4-.9.6-1.87.6-2.87 0-1.74-.6-3.32-1.79-4.73C15.11 5.12 13.62 4.3 11.83 4.3c-1.83 0-3.35.83-4.54 2.51-1.16 1.64-1.74 3.51-1.74 5.61 0 2.11.58 3.99 1.74 5.63 1.18 1.67 2.7 2.51 4.54 2.51 1.54 0 2.86-.64 3.97-1.92l.81 1.34c.15.25.32.44.51.57.19.13.43.2.71.2h.74l-2.09-3.41zM11.83 18.23c-1.33 0-2.43-.63-3.29-1.89-.83-1.22-1.25-2.65-1.25-4.31 0-1.65.41-3.08 1.22-4.29.85-1.25 1.95-1.87 3.32-1.87s2.47.62 3.32 1.87c.81 1.21 1.22 2.64 1.22 4.29 0 1.66-.42 3.09-1.25 4.31-.86 1.26-1.96 1.89-3.29 1.89z" />
    </svg>
);

const TSIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.035 0h21.93c.571 0 1.035.464 1.035 1.035v21.93c0 .571-.464 1.035-1.035 1.035h-21.93c-.571 0-1.035-.464-1.035-1.035v-21.93c0-.571.464-1.035 1.035-1.035zm19.863 18.995c.004-.766-.341-1.428-1.037-1.983-.695-.558-1.574-.919-2.636-1.082l-.963-.146c-.636-.098-1.125-.22-1.463-.365-.339-.147-.53-.406-.57-.775-.01-.309.117-.558.384-.741.268-.184.629-.276 1.084-.276.438 0 .822.102 1.15.309.329.206.568.529.718.966l3.374-1.164c-.201-.58-.553-1.054-1.055-1.42-.501-.366-1.112-.61-1.833-.733-.721-.122-1.516-.182-2.388-.182-.88 0-1.683.085-2.408.256-.726.17-1.326.439-1.801.808-.476.369-.824.819-1.041 1.349-.219.529-.328 1.127-.328 1.792 0 .762.179 1.396.539 1.902.359.505.86.911 1.5.117.64.305 1.416.531 2.329.679l1.157.182c.866.136 1.503.3 1.912.492.409.191.614.512.614.962 0 .393-.162.705-.487.935-.325.23-.787.345-1.388.345-.63 0-1.14-.14-1.53-.42-.39-.28-.682-.727-.872-1.341l-3.384 1.442c.311.9.827 1.6 1.549 2.097.722.5 1.62.75 2.695.75 1.042 0 1.97-.132 2.783-.396.814-.265 1.487-.643 2.022-1.135.534-.492.932-1.076 1.192-1.753.253-.746.38-1.481.38-2.205zm-15.378-5.321h-3.46v10.326h3.46v-10.326zm2.336-3.674h-8.086v3.297h2.32v7.029h3.46v-7.029h2.306v-3.297z" />
    </svg>
);

const ReactIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
    </svg>
);

const TailwindIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
);

const FigmaIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 24C15.3137 24 18 21.3137 18 18V12H12C8.68629 12 6 14.6863 6 18C6 21.3137 8.68629 24 12 24Z" fill="#1ABCFE" />
        <path d="M6 12C6 8.68629 8.68629 6 12 6H18V12H12C8.68629 12 6 9.31371 6 6Z" fill="#A259FF" />
        <path d="M6 6C6 2.68629 8.68629 0 12 0H18V6H12C8.68629 6 6 3.31371 6 6Z" fill="#F24E1E" />
        <path d="M18 0H24V6H18V0Z" fill="#FF7262" />
        <path d="M18 6H24V12H18V6Z" fill="#0ACF83" />
    </svg>
);

const ExpressIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="14" fontWeight="900">ex</text>
    </svg>
);

const PythonIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.997 0C9.648 0 7.3.012 5.025.044c-1.312.02-2.383 1.057-2.463 2.368-.118 1.907-.118 3.824 0 5.731.063 1.042.846 1.886 1.884 2.05.748.118 1.503.118 2.251.118v1.127H4.379c-1.295 0-2.348 1.053-2.348 2.348v3.425c0 1.295 1.053 2.348 2.348 2.348h3.425V21.19c0 .762.617 1.379 1.379 1.379h2.348c.762 0 1.379-.617 1.379-1.379v-2.348h3.354c1.295 0 2.342-1.047 2.342-2.342v-3.41c0-1.295-1.047-2.342-2.342-2.342h-2.316v-1.112h2.251c1.037-.164 1.821-1.008 1.884-2.05.118-1.907.118-3.824 0-5.731-.08-1.312-1.15-2.348-2.463-2.368C16.697.012 14.347 0 11.997 0zm-2.348 2.348c.648 0 1.174.526 1.174 1.174s-.526 1.174-1.174 1.174-1.174-.526-1.174-1.174.526-1.174 1.174-1.174zm4.696 16.924c.648 0 1.174.526 1.174 1.174s-.526 1.174-1.174 1.174-1.174-.526-1.174-1.174.526-1.174 1.174-1.174z" />
    </svg>
);

const CSSIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.673h6.596l-.6 6.761-3.136.885-3.135-.882-.183-2.05H5.894l.33 3.705L12 22.05l5.774-1.632.816-16.005z" />
    </svg>
);

const NodeIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 21.6L3.6 16.8V7.2L12 2.4l8.4 4.8v9.6L12 21.6zM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
    </svg>
);

const MongoIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.152 11.232c-.368-4.48-2.544-7.248-4.592-9.152-.288-.272-.656-.448-1.056-.448s-.768.176-1.056.448c-2.048 1.904-4.224 4.672-4.592 9.152-1.024.16-1.84.848-1.84 1.712 0 .544.32 1.056.848 1.408.128.08.272.16.416.208-.016.48-.016.976-.016 1.456 0 1.92.384 3.632 1.072 5.088.24.496.672.848 1.184.976.128.032.256.032.384.032.224 0 .432-.048.624-.128 1.136-.496 2.016-1.344 2.512-2.384.288-.592.48-1.232.576-1.92.688-2.608.688-5.344.688-7.968 0-.4 0-.784.016-1.168.144-.048.288-.128.416-.208.528-.352.848-.864.848-1.408 0-.864-.816-1.552-1.84-1.712zM12 19.344c-.768 0-1.424-.592-1.552-1.344-.144-.816-.144-1.648-.144-2.48s0-1.664.144-2.48c.128-.752.784-1.344 1.552-1.344s1.424.592 1.552 1.344c.144.816.144 1.648.144 2.48s0 1.664-.144 2.48c-.128.752-.784 1.344-1.552 1.344z" />
    </svg>
);


const CPPIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.59 7.09L10.5 8.18l2.91 2.91-2.91 2.91 1.09 1.09 4-4-4-4zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-2 0c0-5.523-4.477-10-10-10S2 6.477 2 12s4.477 10 10 10 10-4.477 10-10zm-15 0c0-1.654 1.346-3 3-3 .721 0 1.378.252 1.9.673l1.414-1.414C11.536 7.425 9.873 7 8 7c-2.761 0-5 2.239-5 5s2.239 5 5 5c1.873 0 3.536-.425 5.314-1.258l-1.414-1.414c-.522.421-1.179.672-1.9.672-1.654 0-3-1.346-3-3zm12.5-2h-2v1.5h2V13h-2v1.5h2v1.5h-1.5V13H15v-1.5h1.5v-2H15V8h1.5v1.5h1.5v.5z" />
    </svg>
);

const JavaIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.912 21.328c-.016.031-.047.047-.078.047a.2.2 0 0 1-.031-.016c-.031-.016-.062-.031-.109-.062a.15.15 0 0 1-.047-.047c-.016-.016-.016-.047-.047-.062.171-.233.342-.451.512-.684.155-.218.326-.436.482-.67-.062-.047-.14-.093-.218-.14-.498-.249-1.043-.451-1.634-.405-.623.047-1.12.358-1.479.887-.342.514-.373 1.136-.016 1.712.374.591.95.887 1.572.84.591-.047 1.058-.358 1.417-.84.093-.14.171-.28.249-.441-.124-.047-.265-.109-.413-.171zm-2.071-11.23c-1.775 0-3.208.576-3.208 1.292 0 .545.825 1.012 1.993 1.199l.482.047.14-.467s-.607-.156-.607-.405c0-.187.514-.405 1.2-.405 1.308 0 2.366.809 2.366 1.806 0 1.369-1.993 1.884-4.22 1.884-3.1 0-5.603-1.308-5.603-2.928 0-1.806 3.1-3.208 6.916-3.208h.545c1.479 0 2.801.218 3.813.591C14.188 9.771 12.864 10.098 10.841 10.098zm8.79 5.31c.078.14.249.233.358.358-.311.187-.638.311-.965.405-.28.093-.576.156-.872.202.047.109.093.233.155.342.124.233.249.467.42.685.14.171.311.327.531.42 1.34.623 2.756 1.012 4.22 1.106-.187-.202-.343-.436-.451-.685-.125-.265-.218-.545-.265-.84a1.8 1.8 0 0 1-.031-.249c.56.093 1.121.202 1.682.358.077-.109.155-.249.186-.389-.389-.42-.763-.779-1.121-1.183.078-.156.124-.311.124-.482a.8.8 0 0 0-.218-.545.5.5 0 0 0-.109-.109.15.15 0 0 0-.047-.047c-.016.015-.062-.031-.109-.078-.047-.047-.078-.109-.124-.156-.124-.078-.265-.14-.421-.187-.311-.093-.654-.156-1.043-.156-.919 0-1.744.405-2.288 1.043l-.156.171c.063.15.109.327.109.514 0 .343-.172.639-.405.825zm-6.275 8.163v.016l.016.031c-.016-.016-.016-.031-.016-.047z" />
    </svg>
);

const GitHubIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);


const CIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.151 14.896c1.178.691 2.457 1.104 3.75 1.104 3.442 0 4.401-2.483 4.401-4s-.959-4-4.401-4c-1.293 0-2.572.413-3.75 1.104l-1.049-1.928c1.602-.911 3.328-1.176 4.799-1.176 5.862 0 6.401 3.52 6.401 5.922s-.539 6.078-6.401 6.078c-1.471 0-3.197-.265-4.799-1.176l1.049-1.928z" />
    </svg>
);

const HTMLIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
);

const GitIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.608-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
);

const NextJsIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474.0001.8895.0086 1.0827.1055 1.7476.6943 4.7318 4.0609 8.582 8.6386 9.9648.5717.1698 1.1712.2933 1.8489.3641.3299.0342 1.7474.0342 2.0773 0 1.6479-.1712 3.045-.5479 4.4233-1.2136.2102-.1067.2508-.1358.2219-.1577-.0196-.0136-1.0974-1.4578-2.3985-3.2069l-2.362-3.1804-2.9595-4.3824c-1.6277-2.4073-2.9624-4.3775-2.9741-4.3775-.0007-.0013-.0053 1.9459-.008 4.3328-.0026 4.1677-.003 4.339-.0637 4.4708-.0815.1723-.1437.2439-.2689.3067-.0976.0484-.1843.0577-.5517.0577H5.1886l-.1101-.0699c-.0716-.0454-.1307-.1043-.1697-.1736l-.054-.0958-.0026-5.7984-.0026-5.7989.0814-.1024c.0428-.0559.1346-.1257.1979-.1585.1097-.0547.1536-.0601.966-.0601l.8479.0001 2.4604 3.6782 4.9217 7.3614 1.9805 2.9586.1002-.0647c.8599-.5548 1.7664-1.3441 2.4766-2.1627 1.5268-1.7757 2.5107-3.9812 2.8437-6.3877.0962-.659.108-.8537.108-1.7474-.0001-.8895-.0086-1.0827-.1055-1.7476-.6943-4.7318-4.0609-8.582-8.6386-9.9648C14.7541.1082 13.6817.0047 12.6761.0001 12.4264-.0007 11.7982.0006 11.5725 0z" />
    </svg>
);

const DockerIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.458-.418-.906-.917-1.37-1.116-.342-.135-.7-.154-1.06-.106-.27-1.7-1.344-3.19-2.683-4.27-.336.36-.437.963-.287 1.42-.12-.037-.248-.057-.386-.057h-.062c-.046-.464-.198-.93-.476-1.337-.28-.412-.68-.73-1.147-.89.024.47.09.967.232 1.431-.215-.045-.44-.065-.673-.065-.41 0-.806.075-1.166.22.145-.384.227-.793.227-1.22V4.26l-.01-.01c-.35.108-.67.27-.96.486-.286.217-.533.487-.71.798.084-.09.172-.176.264-.255.27-.233.58-.43.916-.578-.082.3-.12.613-.108.93A4.51 4.51 0 0011 4.26v-.01l-.01-.01a4.38 4.38 0 00-.868.44 4.21 4.21 0 00-.74.668c.264-.24.56-.447.88-.608-.04.273-.05.556-.025.844A4.53 4.53 0 008.56 4.26v-.01l-.01-.01c-.35.108-.67.27-.96.486-.285.217-.532.487-.71.798.46-.382 1.01-.676 1.625-.855-.082.3-.12.613-.107.93A4.51 4.51 0 007.72 4.26v-.01l-.01-.01a4.39 4.39 0 00-.868.44 4.21 4.21 0 00-.74.668c.46-.382 1.01-.676 1.625-.855a5.34 5.34 0 00-.197 1.12c-.52.174-.98.464-1.36.828C5.73 6.78 5.4 7.27 5.19 7.83c-.187.484-.264.994-.244 1.49H2.4c-.398 0-.753.12-1.04.322A1.86 1.86 0 000 11.235v.54c0 2.455 1.004 4.677 2.623 6.286C4.25 19.67 6.48 20.67 8.94 20.67h5.68c1.37 0 2.596-.342 3.63-.952a8.29 8.29 0 002.716-2.636c.523-.847.882-1.798 1.04-2.8h.214a3.83 3.83 0 001.77-.42c.5-.25.935-.617 1.24-1.077.3-.456.463-.99.463-1.543v-.17c0-.604-.17-1.16-.47-1.625a3.1 3.1 0 00-.46-.547z" />
    </svg>
);

const ReduxIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.634 16.504c.87-.075 1.543-.84 1.499-1.754-.046-.914-.796-1.648-1.709-1.648h-.061a1.71 1.71 0 00-1.648 1.769c.046.479.226.869.494 1.153-1.048 2.038-2.621 3.536-5.005 4.795-1.603.839-3.296 1.154-4.944.93-1.378-.195-2.456-.81-3.116-1.799-.988-1.499-1.078-3.116-.255-4.734.6-1.154 1.499-2.008 2.099-2.443a9.96 9.96 0 01-.42-1.543C-.867 14.501-.416 18.651 1.932 20.3c1.768 1.21 4.195 1.544 6.727.93 2.984-.719 5.24-2.353 6.727-4.735l.248.009zm3.data-[state=open]:focus-visible:outline-none..." />
    </svg>
);

const ReduxIconSimple = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.511 0c-.85 0-1.634.297-2.256.79L5.48 3.423A3.857 3.857 0 004.2 6.257v9.128a3.857 3.857 0 001.28 2.834l2.774 2.633c.623.493 1.406.79 2.257.79h2.978c.85 0 1.634-.297 2.256-.79l2.775-2.633A3.857 3.857 0 0019.8 15.385V6.257a3.857 3.857 0 00-1.28-2.834L15.745.79A3.505 3.505 0 0013.489 0h-2.978zm1.489 3.506c4.666 0 8.45 3.784 8.45 8.45s-3.784 8.45-8.45 8.45c-4.667 0-8.45-3.784-8.45-8.45 0-4.666 3.783-8.45 8.45-8.45zm0 2.818a5.632 5.632 0 100 11.264 5.632 5.632 0 000-11.264z" />
    </svg>
);

const MySQLIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.191.214.29.054.104.1.209.154.314l.014-.014c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.55h1.052l1.364 4.23 1.38-4.23h1.048c.228 1.95.368 3.79.516 5.55zm4.32 0H9.1c-.016-1.73-.07-3.96-.198-5.55h1.004c.065.91.1 1.956.107 3.18h.006c.252-.627.686-1.386 1.246-2.282l.718-0.898h1.17l-2.06 2.62 2.15 2.93H12.2zm8.27 0h-4.12V13.15h1.038v4.88h3.082v.665zm-6.03-9.145c-.35-.057-.678-.096-1.001-.113-.328-.02-.639-.03-.934-.03-.46 0-.892.043-1.29.132l-.003.02c-.14.074-.29.157-.466.262-.19.12-.39.254-.598.41a1.1 1.1 0 00-.324.348c-.08.147-.118.295-.118.452 0 .277.113.52.338.735.222.21.51.348.857.415.285.052.546.075.783.068l.01-.002a3.99 3.99 0 01-.174.456c-.104.27-.225.52-.362.751-.138.23-.29.42-.456.567-.168.147-.348.225-.537.234a.84.84 0 01-.39-.098l-.31-.151-.218.555c.139.1.287.18.445.242.157.063.31.09.457.082.274-.017.527-.127.76-.33.237-.205.447-.488.634-.852.187-.36.34-.783.462-1.264.12-.48.203-.988.247-1.527l.003-.035c.06-.7.085-1.382.072-2.05-.013-.666-.055-1.234-.125-1.706-.07-.47-.174-.842-.312-1.12a1.57 1.57 0 00-.557-.662c-.12-.07-.255-.11-.398-.11-.262 0-.508.12-.74.36A2.55 2.55 0 008.6 6.54a5.34 5.34 0 00-.312.92c-.076.327-.128.644-.157.955-.03.31-.035.603-.018.877l.002.022c.023.42.068.805.135 1.16.067.35.162.664.283.94.121.28.27.51.448.698.18.186.386.318.617.39.013.006.025.012.04.016a3.15 3.15 0 00.574.09c.204.01.41.017.617.017.208 0 .414-.01.615-.036.202-.025.39-.06.563-.101z" />
    </svg>
);

const ViteIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 0L14.354 17.763l-2.918-7.677L24 0zM0 0l14.354 17.763 2.918-7.677L0 0zm14.354 24l-4.018-9.914 4.018 2.151 4.018-2.151L14.354 24z" />
    </svg>
);

const PostmanIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.584-3.8 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.934 10.68l-3.641 3.642a.755.755 0 01-1.068 0l-1.75-1.749a.754.754 0 011.068-1.068l1.216 1.215 3.107-3.107a.754.754 0 111.068 1.067z" />
    </svg>
);

const FocusSection = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = React.useState(window.innerWidth >= 768 && window.innerWidth < 1024);

    React.useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { scrollYProgress: entranceProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const { scrollYProgress: exitProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const entranceScale = useTransform(entranceProgress, [0, 0.4], [0.5, 1]);
    const entranceOpacity = useTransform(entranceProgress, [0, 0.4], [0, 1]);
    const entranceY = useTransform(entranceProgress, [0, 0.4], [300, 0]);

    const exitScale = useTransform(exitProgress, [0.5, 1], [1, 0.7]);
    const exitOpacity = useTransform(exitProgress, [0.5, 1], [1, 0.5]);
    const exitY = useTransform(exitProgress, [0.5, 1], [0, -100]);

    const scale = useTransform([entranceProgress, exitProgress], ([ent, ext]) => ent < 1 ? entranceScale.get() : exitScale.get());
    const opacity = useTransform([entranceProgress, exitProgress], ([ent, ext]) => ent < 1 ? entranceOpacity.get() : exitOpacity.get());
    const y = useTransform([entranceProgress, exitProgress], ([ent, ext]) => ent < 1 ? entranceY.get() : exitY.get());

    const [currentTech, setCurrentTech] = useState(0);

    const techs = [
        { icon: JSIcon,       color: '#F7DF1E' },
        { icon: TSIcon,       color: '#3178C6' },
        { icon: ReactIcon,    color: '#61DAFB' },
        { icon: NodeIcon,     color: '#339933' },
        { icon: ExpressIcon,  color: '#68A063' },
        { icon: MongoIcon,    color: '#47A248' },
        { icon: PythonIcon,   color: '#3776AB' },
        { icon: CPPIcon,      color: '#00599C' },
        { icon: JavaIcon,     color: '#007396' },
        { icon: GitHubIcon,   color: '#aaaaaa' },
        { icon: TailwindIcon, color: '#06B6D4' },
        { icon: CSSIcon,      color: '#1572B6' },
        { icon: FigmaIcon,    color: '#F24E1E' },
        { icon: HTMLIcon,     color: '#E34F26' },
        { icon: GitIcon,      color: '#F05032' },
        { icon: NextJsIcon,   color: '#ffffff' },
        { icon: DockerIcon,   color: '#2496ED' },
        { icon: ReduxIconSimple, color: '#764ABC' },
        { icon: MySQLIcon,    color: '#4479A1' },
        { icon: ViteIcon,     color: '#646CFF' },
        { icon: PostmanIcon,  color: '#FF6C37' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTech((prev) => (prev + 1) % techs.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="focus"
            style={{
                backgroundColor: '#0a0a0a',
                padding: isMobile ? '80px 5%' : '120px 10%',
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2
            }}
        >
            <motion.div
                style={{
                    scale,
                    opacity,
                    y,
                    width: '100%'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
                    <h2 style={{ fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : isTablet ? '3.5rem' : '4.5rem', fontWeight: '500', color: '#fff', lineHeight: '1.2' }}>
                        Focusing on the <span style={{ color: 'var(--accent-color)', fontStyle: 'italic', fontFamily: 'serif' }}>Best</span>
                    </h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '1.5rem' : '2rem'
                }}>
                    {/* Left: Tech Stack Card */}
                    <motion.div
                        whileHover={isMobile ? {} : { y: -10 }}
                        style={{
                            background: 'radial-gradient(circle at top left, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '30px',
                            padding: isMobile ? '2.5rem' : '4rem',
                            height: isMobile ? '500px' : isTablet ? '500px' : '650px',
                            position: 'relative',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)',
                            pointerEvents: 'none'
                        }} />

                        <div style={{
                            position: 'absolute',
                            top: 0, left: 0,
                            width: '100%',
                            height: '75%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2,
                            pointerEvents: 'none',
                            overflow: 'hidden',
                        }}>
                            <TechOrbit
                                currentTech={currentTech}
                                techs={techs}
                                isMobile={isMobile}
                            />
                        </div>

                        <div style={{ position: 'relative', zIndex: 3 }}>
                            <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>
                                <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Multiple</span> Tech Stack
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: isMobile ? '0.9rem' : '1.1rem' }}>
                                I have worked with multiple technologies and frameworks to build scalable and efficient applications.
                            </p>
                        </div>

                        {/* Faded Background Text */}
                        <div style={{
                            position: 'absolute',
                            top: '20%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: isMobile ? '6rem' : '12rem',
                            fontWeight: '900',
                            color: 'rgba(255,255,255,0.02)',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap'
                        }}>
                            EXPERT
                        </div>
                    </motion.div>

                    {/* Right: Sub-cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateRows: isMobile ? 'none' : '1fr 1fr',
                        gridTemplateColumns: isMobile ? '1fr' : 'none',
                        gap: isMobile ? '1.5rem' : '2rem'
                    }}>
                        {/* Top: Dev & Design */}
                        <motion.div
                            whileHover={isMobile ? {} : { y: -10 }}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '30px',
                                padding: isMobile ? '2rem' : '3rem',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                {[Database, Monitor, Palette].map((Icon, i) => (
                                    <div key={i} style={{
                                        width: isMobile ? '45px' : '60px',
                                        height: isMobile ? '45px' : '60px',
                                        borderRadius: '12px',
                                        background: i === 1 ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: i === 1 ? '#000' : '#fff',
                                        boxShadow: i === 1 ? '0 0 20px rgba(163, 255, 0, 0.3)' : 'none'
                                    }}>
                                        <Icon size={isMobile ? 20 : 24} />
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>
                                Dev & <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Design</span>
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                                Excels in both development and design to create a seamless and intuitive user experience.
                            </p>
                        </motion.div>

                        {/* Bottom: Collaborations */}
                        <motion.div
                            whileHover={isMobile ? {} : { y: -10 }}
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '30px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                overflow: 'hidden',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: isMobile ? '2rem' : '3rem',
                                minHeight: isMobile ? '300px' : isTablet ? '220px' : 'auto'
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800"
                                alt="Collaborations"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: 0.3,
                                    zIndex: 1
                                }}
                            />
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '0.5rem' }}>
                                    Open to <span style={{ color: 'var(--accent-color)', fontStyle: 'italic' }}>Collaborations</span>
                                </h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                                    Whether a small minor project or your next big SaaS, I am always open to collaborations and new projects.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default FocusSection;
