import { useState, useEffect } from 'react';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';

import api from '../../services/api';
import { DataApi } from '../../types/interfaces';

import { Container, DeleteButton, Form, List, SubmitButton } from './styles';
import { Link } from 'react-router-dom';


export default function Home() {
	const [repositoryName, setRepositoryName] = useState<string>('');
	const [repositories, setRepositories] = useState<DataApi[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [alert, setAlert] = useState<boolean>(false);


	useEffect(() => {

		const savedRepositories: string | null = localStorage.getItem('@repositories');

		if (savedRepositories) {
			setRepositories(JSON.parse(savedRepositories));
		}

	}, []);

	useEffect(() => {

		localStorage.setItem('@repositories', JSON.stringify(repositories));

	}, [repositories]);





	async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();
		setLoading(true);
		setAlert(false);
		try {

			if (repositoryName === '') {
				throw new Error('You need to indicate a repository!');
			}


			const response = await api.get(`repos/${repositoryName}`);

			const hasRepository: DataApi | undefined = repositories.find(repository => repository.fullName === repositoryName);

			if (hasRepository) {
				throw new Error('Duplicate repository!');
			}

			const newRepository: DataApi = {
				fullName: response.data.full_name,
			};

			setRepositories([...repositories, newRepository]);
			setRepositoryName('');

		} catch (error) {
			setAlert(true);
			console.log(error);

		} finally {

			setLoading(false);
		}

	}

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
		setRepositoryName(event.target.value);
		setAlert(false);
	}

	function handleDelete(fullName: string): void {
		const filteredRepositories: DataApi[] = repositories.filter(repo => repo.fullName !== fullName);
		setRepositories(filteredRepositories);
	}


	return (
		<Container>
			<h1>
				<FaGithub size={25} />
				Meus Repositórios
			</h1>

			<Form onSubmit={handleSubmit} $alert={alert}>
				<input
					type="text"
					placeholder="Adicionar Repositórios"
					value={repositoryName}
					onChange={handleInputChange}
				/>

				<SubmitButton type='submit' disabled={loading}>
					{
						loading
							?
							(<FaSpinner color="#FFF" size={14} />)
							:
							(<FaPlus color="#FFF" size={14} />)
					}

				</SubmitButton>

			</Form>

			<List>
				{repositories.map(repo => (
					<li key={repo.fullName}>

						<span>

							<DeleteButton type='button' onClick={() => { handleDelete(repo.fullName); }} >
								<FaTrash size={14} />
							</DeleteButton>
							{repo.fullName}

						</span>

						<Link to={`/repository/${encodeURIComponent(repo.fullName)}`} >
							<FaBars size={20} />
						</Link>

					</li>
				))}
			</List>

		</Container>
	);
}
