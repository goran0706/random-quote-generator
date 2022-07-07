import 'antd/dist/antd.min.css';
import './App.css';
import { Content } from 'antd/lib/layout/layout';
import { Layout, Button } from 'antd';
import { ReadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
	const [quote, setQuote] = useState(null);
	const [author, setAuthor] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setError(null);
		}, 3000);
	}, [error]);

	const getQuote = async () => {
		try {
			setLoading(true);

			const options = {
				method: 'GET',
				url: process.env.REACT_APP_ENV_API,
				headers: {
					'X-RapidAPI-Host': process.env.REACT_APP_ENV_API_HOST,
					'X-RapidAPI-Key': process.env.REACT_APP_ENV_API_KEY,
				},
			};

			const { data } = await axios.request(options);
			setQuote(data.content);
			setAuthor(data.originator.name);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return (
		<Layout className='wrapper'>
			<Content className='quote'>
				{!error && quote && (
					<div className='quote__text'>
						&quot;{quote}&quot;
						{author && <div className='quote_s_text'>- {author}</div>}
					</div>
				)}
				{error && <span className='quote__text'>{error.message}</span>}
				<Button
					className='quote__btn'
					type='primary'
					loading={loading}
					onClick={getQuote}>
					Get Quote
					<ReadOutlined />
				</Button>
			</Content>

			<span className='shoutout'>
				Photo by{' '}
				<a href='https://unsplash.com/@alfonsmc10?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
					Alfons Morales
				</a>{' '}
				on{' '}
				<a href='https://unsplash.com/s/photos/library?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
					Unsplash
				</a>
			</span>
		</Layout>
	);
};

export default App;
