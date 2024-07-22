'use client';

import { IonContent, IonList } from '@ionic/react';
import { GRAMMAR_EXAMPLES_LIST } from './config';
import styles from './styles.module.scss';

type ItemsListProps = {
	onCopy: (item: string) => void;
};

export const ItemsList = ({ onCopy }: ItemsListProps) => {
	return (
		<div className={styles.ListContainer}>
			<div className={styles.Title}>URN Examples</div>
			<IonContent>
				<IonList>
					{GRAMMAR_EXAMPLES_LIST.map((item, index) => (
						<div key={index} className={styles.ListItem} onClick={() => onCopy(item)}>
							{item}
						</div>
					))}
				</IonList>
			</IonContent>
		</div>
	);
};
