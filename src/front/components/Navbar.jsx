import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

// Utilidades de token seguras
const tokenUtils = {
	decodeToken: (token) => {
		try {
			if (!token) return null;
			const parts = token.split('.');
			if (parts.length !== 3) return null;
			return JSON.parse(atob(parts[1]));
		} catch (error) {
			return null;
		}
	},
	getRole: (token) => {
		const payload = tokenUtils.decodeToken(token);
		return payload ? payload.role : null;
	}
};

export const Navbar = () => {
	const { store, getRealtimeStatus, startRealtimeSync } = useGlobalReducer();
	const { isAuthenticated, token } = store.auth;

	// SEGURIDAD: Obtener rol del token
	const role = tokenUtils.getRole(token);

	// Estado de sincronización en tiempo real
	const realtimeStatus = getRealtimeStatus();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container ">


				<div className="d-flex  gap-4 ">

					<div className="d-flex flex-column align-items-center">
						<Link to="/">
							<span className="navbar-brand mb-0 h1">TiBACK</span>
						</Link>

						{isAuthenticated && (
							<Link to={`/${role}`}>
								<button className="btn btn-primary mt-2 ">Dashboard</button>
							</Link>
						)}

						{/* Indicador de estado de sincronización */}
						{isAuthenticated && (
							<div className="d-flex align-items-center mt-2">
								<span className={`badge ${realtimeStatus.isConnected ? 'bg-success' : realtimeStatus.isPolling ? 'bg-warning' : 'bg-danger'} me-2`}>
									{realtimeStatus.statusIcon} {realtimeStatus.statusText}
								</span>
								<small className="text-muted">
									Sync: {realtimeStatus.lastSyncFormatted}
								</small>
							</div>
						)}
					</div>



					{role === 'administrador' && (
						<>
							<Link to="/clientes">
								<button className="btn btn-outline-secondary">Clientes</button>
							</Link>
							<Link to="/analistas">
								<button className="btn btn-outline-secondary">Analistas</button>
							</Link>
							<Link to="/supervisores">
								<button className="btn btn-outline-secondary">Supervisores</button>
							</Link>
							<Link to="/administradores">
								<button className="btn btn-outline-secondary me-4">Administradores</button>
							</Link>
							<Link to="/gestiones">
								<button className="btn btn-outline-secondary">Gestiones</button>
							</Link>
							<Link to="/tickets">
								<button className="btn btn-outline-secondary">Tickets</button>
							</Link>
							<Link to="/comentarios">
								<button className="btn btn-outline-secondary">Comentarios</button>
							</Link>
							<Link to="/asignaciones">
								<button className="btn btn-outline-secondary ">Asignaciones</button>
							</Link>
						</>
					)}

				</div>
			</div>
		</nav>
	);
};