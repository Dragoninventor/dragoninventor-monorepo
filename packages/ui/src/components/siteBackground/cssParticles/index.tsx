import React from "react";

import styles from "./Particles.module.scss";

// Based on the styles from: https://codepen.io/tonkotsuboy/pen/xaMVpo by Takeshi Kano
// Consider switching to particle.js :(

export const CssParticles = () => {
	return (
		<div
			className={`${styles.container} absolute left-0 top-0 h-full w-full`}
		>
			{[...Array(200)].map((_, index) => (
				<div className={styles.particlesContainer} key={index}>
					<div className={styles.particle} />
				</div>
			))}
		</div>
	);
};
