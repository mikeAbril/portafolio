<template>
    <div>
        <h1>elige dificultad</h1>
        <div class="dificultades">
            <div>
              <button class="cajaDificultad">
                    <router-link to="/juego">
                        <p>facil</p>
                    </router-link>
                </button>
            </div>
            <div>
                <button class="cajaDificultad">
                    <router-link to="/juego">
                        <p>medio</p>
                    </router-link>
                </button>
            </div>
            <div>
                <button class="cajaDificultad">
                    <router-link to="/juego">
                        <p>dificil</p>
                    </router-link>
                </button>
            </div>

            
            
        </div>

        <q-btn style="background: goldenrod; color: white" label="atras" to="/categoria"/>
    </div>
</template>

<style>
.cajaDificultad{
    height: 50px;
    width: 500px;
    background-color: white;
    border: 4px solid red;
}
</style>