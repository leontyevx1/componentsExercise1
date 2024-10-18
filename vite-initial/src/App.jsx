import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueValid, setIsValueValid] = useState(false);
	const [date, setDate] = useState('');

	const createNewDate = () => {
		const newDate = new Date()
			.toLocaleString('en-GB', {
				hour12: false,
			})
			.replaceAll('/', '.')
			.replace(',', '');
		return newDate;
	};

	const onInputButtonClick = () => {
		const promptValue = prompt();

		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа!');
			setIsValueValid(false);
		} else {
			setValue(promptValue);
			setDate(createNewDate());
			setError('');
			setIsValueValid(true);
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			setList([...list, { id: Date.now(), value: value, date: date }]);
			setValue('');
			setError('');
			setIsValueValid(false);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>:
				<output className={styles.currentValue}> {value}</output>
			</p>
			{error !== '' ? <div className={styles.error}>{error}</div> : null}
			<div className={styles.buttonsContainer}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{list.length === 0 ? (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				) : (
					<ul className={styles.list}>
						{list.map(({ id, value, date }) => (
							<li className={styles.listItem} key={id}>
								{value} <span className={styles.date}>{date}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
