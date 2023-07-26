import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import api from '../../services/api';
import { RepositoryObj, IssuesObj, FiltersObj } from '../../types/interfaces';

import { Container, FilterList, IssuesList, Loading, Owner, PageActions } from './styles';





export default function Repository() {

	const [repository, setRepository] = useState<RepositoryObj | undefined>();
	const [issues, setIssues] = useState<IssuesObj[] | undefined>();
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [filters] = useState<FiltersObj[]>([
		{ state: 'all', label: 'Todas', active: true },
		{ state: 'open', label: 'Abertas', active: false },
		{ state: 'closed', label: 'Fechadas', active: false },
	]);
	const [filterIndex, setFilterIndex] = useState<number>(0);

	const { repositoryName } = useParams();



	useEffect(() => {

		async function load() {

			try {
				const [repositoryData, issuesData] = await Promise.all([
					api.get(`/repos/${repositoryName}`),
					api.get(`/repos/${repositoryName}/issues`, {
						params: {
							state: filters.find(f => f.active)!.state,
							page: page,
							per_page: 5,
						}
					}),

					// se eu nao usasse o axios eu teria que fazer dessa forma
					// api.get(`/repos/${repositoryName}/issues?state=${filters[0].state}&page=${page}&per_page=5`)
				]);

				// console.log(issuesData);



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


	useEffect(() => {

		async function loadIssues() {
			setLoading(true);

			try {

				const response = await api.get(`/repos/${repositoryName}/issues`, {
					params: {
						state: filters[filterIndex].state,
						page,
						per_page: 5,
					}
				});

				setIssues(response.data);

			} catch (error) {
				console.log(error);


			}
			finally {
				setLoading(false);
			}

		}

		loadIssues();

	}, [page, filterIndex]);



	function handlePage(action: 'next' | 'back') {
		setPage(action === 'back' ? page - 1 : page + 1);
	}

	function handleFilters(index: number) {


		setFilterIndex(index);


	}


	if (loading || repository === undefined || issues === undefined) {
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

			<FilterList $active={filterIndex}>
				{filters.map((filter, index) => (
					<button
						key={index}
						type='button'
						onClick={() => { handleFilters(index); }}
					>
						{filter.label}
					</button>

				))}

			</FilterList>


			<IssuesList>

				{
					issues.map(issue => (
						<li key={issue.id}>
							<img src={issue.user.avatar_url} alt={issue.user.login} />

							<div>
								<strong>
									<a href={issue.html_url} target="_blank" rel="noreferrer">
										{issue.title}
									</a>

									{issue.labels.map(label => (
										<span key={label.id}>{label.name}</span>
									))}
								</strong>

								<p>{issue.user.login}</p>

							</div>



						</li>
					)
					)
				}

			</IssuesList>

			<PageActions>

				<button
					type='button'
					disabled={page < 2 ? true : false}
					onClick={() => { handlePage('back'); }}
				>
					Voltar
				</button>

				<button type='button' onClick={() => { handlePage('next'); }}>
					Proxima
				</button>

			</PageActions>

		</Container>
	);
}