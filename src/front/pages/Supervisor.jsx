import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export const Supervisor = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const API = import.meta.env.VITE_BACKEND_URL + "/api";

    const setLoading = (v) => dispatch({ type: "api_loading", payload: v });
    const setError = (e) => dispatch({ type: "api_error", payload: e?.message || e });

    const fetchJson = (url, options = {}) => {
        const token = store.auth.token;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return fetch(url, {
            ...options,
            headers
        })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .catch(err => ({ ok: false, data: { message: err.message } }));
    };

    const eliminarSupervisor = (id) => {
        if (!confirm("¿Estás seguro de que deseas eliminar este supervisor?")) return;
        setLoading(true);
        fetchJson(`${API}/supervisores/${id}`, { method: "DELETE" })
            .then(({ ok, data }) => {
                if (!ok) throw new Error(data.message);
                dispatch({ type: "supervisores_remove", payload: parseInt(id) });
            })
            .catch(setError)
            .finally(() => setLoading(false));
    };

    const listarTodosLosSupervisores = () => {
        setLoading(true);
        fetchJson(`${API}/supervisores`)
            .then(({ ok, data }) => {
                if (!ok) throw new Error(data.message);
                dispatch({ type: "supervisores_set_list", payload: data });
            })
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
          if (!store.supervisores || store.supervisores.length === 0) {
                listarTodosLosSupervisores();
          }
    }, []);

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Gestión de Supervisores</h2>
                <button className="btn btn-secondary" onClick={() => navigate(`/${tokenUtils.getRole(store.auth.token)}`)}>Volver</button>
            </div>

            {store?.api?.error && (
                <div className="alert alert-danger py-2">{String(store.api.error)}</div>
            )}
            <div className="d-flex justify-content-end mb-3">
                <Link to="/supervisores/nuevo" className="btn btn-primary mb-3">
                    <i className="fas fa-plus"></i> Nuevo Supervisor
                </Link>
            </div>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Lista de Supervisores</h5>
                </div>
                <div className="card-body">
                    {Array.isArray(store.supervisores) && store.supervisores.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Área Responsable</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {store.supervisores.map((supervisor) => (
                                        <tr key={supervisor.id}>
                                            <td>{supervisor.id}</td>
                                            <td>{supervisor.nombre}</td>
                                            <td>{supervisor.apellido}</td>
                                            <td>{supervisor.email}</td>
                                            <td>{supervisor.area_responsable}</td>
                                            <td>
                                                <Link
                                                    to={`/supervisor/${supervisor.id}`}
                                                    className="btn btn-info btn-sm mx-1"
                                                    title="Ver Supervisor"
                                                >
                                                    <i className="fas fa-eye"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-danger btn-sm mx-1"
                                                    onClick={() => eliminarSupervisor(supervisor.id)}
                                                    title="Eliminar Supervisor"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-muted">No hay supervisores registrados.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
