const EVENTS_DATA = {
    "2007": {
        "title": "Incendios en Galicia 2007",
        "summary": "Uno de los años más graves registrados: miles de hectáreas afectadas y un aumento notable de incendios provocados.",
        "source": "Xunta de Galicia / prensa local",
        "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop",
        "links": [
            { "text": "Noticia: La ola de incendios de 2007", "url": "#" },
            { "text": "Informe Medioambiental", "url": "#" }
        ]
    },
    "2008": {
        "title": "Incendios en Galicia 2008",
        "summary": "Año con menos superficie quemada gracias a condiciones meteorológicas favorables y campañas de prevención.",
        "source": "Xunta de Galicia",
        "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1000&auto=format&fit=crop",
        "links": [
            { "text": "Balance de la campaña 2008", "url": "#" }
        ]
    },
    "2009": {
        "title": "Incendios en Galicia 2009",
        "summary": "Rebrote de incendios estivales en Ourense y Pontevedra. Se refuerza la vigilancia rural.",
        "source": "Prensa local",
        "image": "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2010": {
        "title": "Incendios en Galicia 2010",
        "summary": "Año relativamente estable. La mayor parte de incendios se concentran en agosto.",
        "source": "Meteogalicia",
        "image": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2011": {
        "title": "Incendios en Galicia 2011",
        "summary": "Fuerte aumento de incendios forestales debido a una sequía prolongada.",
        "source": "Xunta / Informes ambientales",
        "image": "https://images.unsplash.com/photo-1604928151860-9d0422239611?q=80&w=1000&auto=format&fit=crop",
        "links": [
            { "text": "La sequía y el fuego", "url": "#" }
        ]
    },
    "2012": {
        "title": "Incendios en Galicia 2012",
        "summary": "Uno de los peores años de la década. Miles de hectáreas quemadas y varios incendios simultáneos.",
        "source": "Prensa nacional",
        "image": "https://images.unsplash.com/photo-1590418606746-018840f9cd0f?q=80&w=1000&auto=format&fit=crop",
        "links": [
            { "text": "El gran incendio de 2012", "url": "#" },
            { "text": "Video: Brigadas en acción", "url": "#" }
        ]
    },
    "2013": {
        "title": "Incendios en Galicia 2013",
        "summary": "Descenso notable respecto al año anterior. Mejoras en coordinación de brigadas.",
        "source": "Xunta",
        "image": "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2014": {
        "title": "Incendios en Galicia 2014",
        "summary": "Año suave, condicionado por lluvias frecuentes que redujeron el riesgo.",
        "source": "Meteogalicia",
        "image": "https://images.unsplash.com/photo-1501854140884-074bf6bfa8fb?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2015": {
        "title": "Incendios en Galicia 2015",
        "summary": "Incremento significativo de superficie quemada. Incendios en zonas urbanas de O Barbanza.",
        "source": "Prensa local",
        "image": "https://images.unsplash.com/photo-1536630596251-d452d3988e02?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2016": {
        "title": "Incendios en Galicia 2016",
        "summary": "Año crítico. Fuegos simultáneos en varias provincias generaron situaciones de emergencia.",
        "source": "Xunta / Protección civil",
        "image": "https://images.unsplash.com/photo-1511268011861-691ed6d9036f?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2017": {
        "title": "Incendios en Galicia 2017",
        "summary": "Año trágico. Olas de incendios afectaron Vigo, Nigrán y Redondela. Varios fallecidos.",
        "source": "Prensa nacional",
        "image": "https://images.unsplash.com/photo-1616858547432-841f3d8e5783?q=80&w=1000&auto=format&fit=crop",
        "links": [
            { "text": "El domingo negro de Galicia", "url": "#" },
            { "text": "Testimonios desde Vigo", "url": "#" }
        ]
    },
    "2018": {
        "title": "Incendios en Galicia 2018",
        "summary": "Estabilidad general con pocos incendios de gran magnitud.",
        "source": "Xunta",
        "image": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2019": {
        "title": "Incendios en Galicia 2019",
        "summary": "Incendios importantes en Monterrei y A Mezquita. Alto riesgo por fuertes vientos.",
        "source": "Prensa local",
        "image": "https://images.unsplash.com/photo-1525946956976-b6f709c0ec95?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2020": {
        "title": "Incendios en Galicia 2020",
        "summary": "Descenso notable por restricciones de movilidad durante la pandemia.",
        "source": "Informes ambientales",
        "image": "https://images.unsplash.com/photo-1588613444747-0e695d10d65b?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2021": {
        "title": "Incendios en Galicia 2021",
        "summary": "Temporada irregular. Rebrotes de incendios durante septiembre.",
        "source": "Xunta",
        "image": "https://images.unsplash.com/photo-1504958043622-c11df5851890?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2022": {
        "title": "Incendios en Galicia 2022",
        "summary": "Uno de los peores años recientes. Grandes incendios en Valdeorras, O Courel y Macizo Central.",
        "source": "Prensa nacional",
        "image": "https://images.unsplash.com/photo-1520113412646-024e565d2179?q=80&w=1000&auto=format&fit=crop",
        "links": [
            { "text": "O Courel arde", "url": "#" }
        ]
    },
    "2023": {
        "title": "Incendios en Galicia 2023",
        "summary": "Año moderado con algunos episodios severos en Ourense.",
        "source": "Meteogalicia",
        "image": "https://images.unsplash.com/photo-1498118029252-4467c69992f9?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2024": {
        "title": "Incendios en Galicia 2024",
        "summary": "Incremento de días de riesgo extremo por olas de calor asociadas al cambio climático.",
        "source": "Informes climáticos",
        "image": "https://images.unsplash.com/photo-1469521669194-babb45f83544?q=80&w=1000&auto=format&fit=crop",
        "links": []
    },
    "2025": {
        "title": "Incendios en Galicia 2025",
        "summary": "Proyección estimada basada en tendencias recientes: riesgo elevado y aumento de superficie afectada.",
        "source": "Proyección propia",
        "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b1d?q=80&w=1000&auto=format&fit=crop",
        "links": []
    }
};
