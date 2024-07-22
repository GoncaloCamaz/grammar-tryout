import { PropsWithChildren, ReactNode } from 'react';
import styles from './styles.module.scss';

type LayoutProps = {
	header?: ReactNode;
	footer?: ReactNode;
}

export const Layout = ({ header, footer, children }: PropsWithChildren<LayoutProps>) => {
	return (
		<div className={styles.Layout}>
			<div className={styles.Header}>{header}</div>
			<div className={styles.Content}>{children}</div>
			<div className={styles.Footer}>{footer}</div>
		</div>
	)
}