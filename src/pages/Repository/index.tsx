import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';
import { RepositoryObj } from '../../types/interfaces';
import { BackButton, Container, Loading, Owner } from './styles';





export default function Repository() {
	const [repository, setRepository] = useState<RepositoryObj | undefined>();
	const [issues, setIssues] = useState([]);
	const [loading, setLoading] = useState<boolean>(true);



	const { repositoryName } = useParams();



	useEffect(() => {

		async function load() {


			try {
				const [repositoryData, issuesData] = await Promise.all([
					api.get(`/repos/${repositoryName}`),
					api.get(`/repos/${repositoryName}/issues?state=open&per_page=5`),
					// teria esse opção de baixo também graças ao Axios, por preferencia pessoal eu optei pelo outro jeito
					// api.get(`/repos/${repository}/issues`, { params: { state: 'open', per_page: 5 } })
				]);


				if (repositoryData && issuesData) {
					setRepository(repositoryData.data);
					setIssues(issuesData.data);
				}
			} catch (err) {
				console.log('Ocorreu um erro ao carregar os dados do repositório.', err);
			} finally {
				setLoading(false);
			}
		}

		load();

	}, []);


	if (loading || repository === undefined) {
		return (
			<Loading>
				<h1>
					Carregando...
				</h1>
			</Loading>
		);
	}

	return (
		<Container>
			<Link to="/">

				<FaArrowLeft size={30} color="#000" />

			</Link>

			<Owner>
				<img
					src={repository.owner.avatar_url}
					alt={repository.owner.login}
				/>
				<h1>{repository.name}</h1>
				<p>{repository.description}</p>

			</Owner>


		</Container>
	);
}