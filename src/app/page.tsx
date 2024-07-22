'use client';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import { Layout } from '@/components/Layout';
import { CodeiumEditor } from '@codeium/react-code-editor';
import { ItemsList } from '@/components/ItemsList';
import { IonButton, IonInput } from '@ionic/react';
import { useCallback, useState } from 'react';

export default function Home() {
	const [codeEditorContent, setCodeEditorContent] = useState('');
	const [urnContent, setUrnContent] = useState('');

	const handleTextChange = useCallback((event: CustomEvent) => {
		setUrnContent(event.detail.value);
	}, []);

	const handleSubmit = useCallback(() => {
		setCodeEditorContent(urnContent);
	}, [urnContent]);

	const handleReset = useCallback(() => {
		setCodeEditorContent('');
		setUrnContent('');
	}, []);

	const handleCopy = useCallback((item: string) => {
		setUrnContent(item);
	}, []);

	return (
		<Layout header={<Header />}>
			<div className={styles.HomePage}>
				<div className={styles.CodeEditorContainer}>
					<CodeiumEditor
						value={codeEditorContent}
						options={{ readOnly: true }}
						language="JSON"
						theme="vs-dark"
						height="100%"
					/>
				</div>
				<div className={styles.ActionsContainer}>
					<ItemsList onCopy={handleCopy} />
					<div className={styles.UrnSubmitContainer}>
						<IonInput
							value={urnContent}
							placeholder="Write here the urn"
							onIonChange={handleTextChange}
						/>
						<div className={styles.Actions}>
							<IonButton size='default' onClick={handleSubmit}>Submit</IonButton>
							<IonButton size='default' onClick={handleReset}>Reset</IonButton>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
