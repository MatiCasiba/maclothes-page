// src/data/menuData.js

export const menuData = {
  productos: {
    hombre: {
      remeras: {
        path: '/hombre/remeras',
        label: 'Remeras'
      },
      camisas: {
        path: '/hombre/camisas',
        label: 'Camisas'
      },
      pantalones: {
        path: '/hombre/pantalones',
        label: 'Pantalones',
        subcategorias: {
          shorts: {
            path: '/hombre/pantalones/shorts',
            label: 'Shorts'
          },
          jeans: {
            path: '/hombre/pantalones/jeans',
            label: 'Jeans'
          },
          deVestir: {
            path: '/hombre/pantalones/de-vestir',
            label: 'De vestir'
          }
        }
      },
      abrigos: {
        path: '/hombre/abrigos',
        label: 'Abrigos',
        subcategorias: {
          camperas: {
            path: '/hombre/abrigos/camperas',
            label: 'Camperas'
          },
          chaquetas: {
            path: '/hombre/abrigos/chaquetas',
            label: 'Chaquetas'
          },
          sobretodos: {
            path: '/hombre/abrigos/sobretodos',
            label: 'Sobretodos'
          },
          chalecos: {
            path: '/hombre/abrigos/chalecos',
            label: 'Chalecos'
          },
          sacos: {
            path: '/hombre/abrigos/sacos',
            label: 'Sacos'
          },
          sweatersBuzos: {
            path: '/hombre/abrigos/sweaters-buzos',
            label: 'Sweaters | Buzos'
          }
        }
      },
      calzados: {
        path: '/hombre/calzados',
        label: 'Calzados',
        subcategorias: {
          zapatos: {
            path: '/hombre/calzados/zapatos',
            label: 'Zapatos'
          },
          zapatillas: {
            path: '/hombre/calzados/zapatillas',
            label: 'Zapatillas'
          }
        }
      },
      accesorios: {
        path: '/hombre/accesorios',
        label: 'Accesorios',
        subcategorias: {
          gorra: {
            path: '/hombre/accesorios/gorra',
            label: 'Gorra'
          },
          corbata: {
            path: '/hombre/accesorios/corbata',
            label: 'Corbata'
          },
          moños: {
            path: '/hombre/accesorios/monos',
            label: 'Moños'
          },
          relojes: {
            path: '/hombre/accesorios/relojes',
            label: 'Relojes'
          },
          boxers: {
            path: '/hombre/accesorios/boxers',
            label: 'Boxers'
          },
          cinturones: {
            path: '/hombre/accesorios/cinturones',
            label: 'Cinturones'
          }
        }
      }
    },
    mujer: {
      blazers: {
        path: '/mujer/blazers',
        label: 'Blazers'
      },
      remerasTops: {
        path: '/mujer/remeras-tops',
        label: 'Remeras | Tops'
      },
      camisasBlusas: {
        path: '/mujer/camisas-blusas',
        label: 'Camisas | Blusas'
      },
      pantalones: {
        path: '/mujer/pantalones',
        label: 'Pantalones',
        subcategorias: {
          deVestir: {
            path: '/mujer/pantalones/de-vestir',
            label: 'De vestir'
          },
          jeans: {
            path: '/mujer/pantalones/jeans',
            label: 'Jeans'
          }
        }
      },
      shortsPolleras: {
        path: '/mujer/shorts-polleras',
        label: 'Shorts | Polleras'
      },
      abrigos: {
        path: '/mujer/abrigos',
        label: 'Abrigos',
        subcategorias: {
          camperas: {
            path: '/mujer/abrigos/camperas',
            label: 'Camperas'
          },
          chalecos: {
            path: '/mujer/abrigos/chalecos',
            label: 'Chalecos'
          },
          sweaters: {
            path: '/mujer/abrigos/sweaters',
            label: 'Sweaters'
          }
        }
      },
      vestidosMonos: {
        path: '/mujer/vestidos-monos',
        label: 'Vestidos | Monos'
      },
      calzados: {
        path: '/mujer/calzados',
        label: 'Calzados'
      },
      accesorios: {
        path: '/mujer/accesorios',
        label: 'Accesorios',
        subcategorias: {
          cinto: {
            path: '/mujer/accesorios/cinto',
            label: 'Cinto'
          },
          bufanda: {
            path: '/mujer/accesorios/bufanda',
            label: 'Bufanda'
          },
          relojes: {
            path: '/mujer/accesorios/relojes',
            label: 'Relojes'
          }
        }
      }
    }
  },
  nosotros: {
    path: '/nosotros',
    label: 'Nosotros'
  },
  contacto: {
    path: '/contacto',
    label: 'Contacto'
  }
};