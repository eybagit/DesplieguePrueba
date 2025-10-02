import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const ActualizarSupervisor = () => {
     const { supervisorid } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const API = import.meta.env.VITE_BACKEND_URL + "/api";

    const [supervisor, setSupervisor] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contraseña_hash: "",
        area_responsable: ""
    });

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

    const cargarSupervisor = () => {
        setLoading(true);
        fetchJson(`${API}/supervisores/${supervisorid}`)
            .then(({ ok, data }) => {
                if (!ok) throw new Error(data.message);
                dispatch({ type: "supervisor_set_detail", payload: data });
                setSupervisor(data);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    };

    const actualizarSupervisor = () => {
        setLoading(true);
        fetchJson(`${API}/supervisores/${supervisorid}`, {
            method: "PUT",
            body: JSON.stringify(supervisor)
        })
            .then(({ ok, data }) => {
                if (!ok) throw new Error(data.message);
                dispatch({ type: "supervisores_upsert", payload: data });
                navigate(`/supervisor/${supervisorid}`);
            })
            .catch(setError)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        cargarSupervisor();
    }, [supervisorid]);

    const controlCambio = (e) => {
        const { name, value } = e.target;
        setSupervisor(f => ({ ...f, [name]: value }));
    };

    return (
        <div className="container py-4">
            <h2 className="mb-3">Editar Supervisor</h2>

            {store.api.error && <div className="alert alert-danger">{store.api.error}</div>}

            <div className="card">
                <div className="card-body">
                   <form onSubmit={(e) => { e.preventDefault(); actualizarSupervisor(); }}>
                        {["nombre", "apellido", "email", "contraseña_hash", "area_responsable"].map((field, idx) => (
                            <div className="mb-3" key={idx}>
                                <label className="form-label text-capitalize">{field.replace("_", " ")}</label>
                                <input
                                       type={field === "email" ? "email" : field === "contraseña_hash" ? "password" : "text"}
                                    className="form-control"
                                    name={field}
                                    value={supervisor[field] || ""}
                                    onChange={controlCambio}
                                    required
                                />
                            </div>
                        ))}
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">
                                <i className="fas fa-save"></i> Guardar Cambios
                            </button>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    );
};

export default ActualizarSupervisor;