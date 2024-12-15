# Importaciones estándar de Python
import os
import csv
import io  # Importa el módulo io
from io import TextIOWrapper
from datetime import datetime
from itertools import accumulate

# Importaciones de bibliotecas de terceros
import numpy as np
import pandas as pd
import statistics

import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt

import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio

from scipy import stats
from sklearn.linear_model import LinearRegression

import statsmodels as sm  # Aunque no se usa en el código, lo dejo por si acaso
from flask import send_file
from flask import Flask, render_template, request, redirect, url_for, send_file, send_from_directory
from werkzeug.utils import secure_filename


# ... (resto del código)

# Configuración Inicial
app = Flask(__name__, static_folder='static')
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')
ALLOWED_EXTENSIONS = {'csv'}

# Variables globales
transacciones = []
df = pd.DataFrame(columns=['Fecha', 'Tipo', 'Monto', 'Categoría', 'Ingresos', 'Gastos'])
CATEGORIAS_VALIDAS = [
    # Ingresos
    "beca", "apoyo familiar", "trabajo de medio tiempo", "freelance",
    "venta de productos", "premios", "inversiones",
    # Gastos
    "educación", "vivienda", "transporte", "comida", "salud",
    "entretenimiento", "tecnología", "gastos personales", "deudas", "emergencias"
]
resultados = {}

# Funciones Utilitarias
def allowed_file(filename):
    """Verifica si el archivo tiene una extensión permitida."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def agregar_transaccion(fecha, tipo, monto, categoria):
    """Agrega una nueva transacción al registro."""
    transacciones.append((fecha, tipo, monto, categoria))
    global df
    df = pd.DataFrame(transacciones, columns=['Fecha', 'Tipo', 'Monto', 'Categoría'])
    df['Ingresos'] = df.apply(lambda x: x['Monto'] if x['Tipo'] == 'ingreso' else 0, axis=1)
    df['Gastos'] = df.apply(lambda x: x['Monto'] if x['Tipo'] == 'gasto' else 0, axis=1)


def procesar_transacciones(transacciones):
    """
    Procesa las transacciones ordenadas por fecha, calculando balances acumulados y finales.
    Args:
        transacciones (list): Lista de transacciones como (fecha, tipo, monto).
                              tipo puede ser 'ingreso' o 'gasto'.
    Returns:
        dict: Contiene:
              - 'balance_acumulado': Lista de (fecha, balance).
              - 'balance_final': Balance total al final.
    """
    transacciones.sort(key=lambda x: x[0])  # Ordenar por fecha
    
    # Convertir los montos según tipo de transacción
    montos = [(monto if tipo == 'ingreso' else -monto) for _, tipo, monto, *_ in transacciones]

    # Calcular balance acumulado
    balances_acumulados = list(accumulate(montos))
    balance_acumulado = [(transacciones[i][0], balances_acumulados[i]) for i in range(len(transacciones))]
    
    # Balance final
    balance = balances_acumulados[-1] if balances_acumulados else 0

    return {
        'balance_acumulado': balance_acumulado,
        'balance': balance
    }


def graficar_finanzas_dinamico(transacciones):                                                                                                                                                                                                                                                                                  
    if not transacciones:  # Verificar si las transacciones están vacías
        return None
    
    # Crear un DataFrame a partir de las transacciones
    df = pd.DataFrame(transacciones, columns=['Fecha', 'Tipo', 'Monto', 'Categoría'])
    
    # Calcular totales de ingresos y gastos
    ingresos = df[df['Tipo'] == 'ingreso']['Monto'].sum()
    gastos = df[df['Tipo'] == 'gasto']['Monto'].sum()
    balance = ingresos - gastos

    # Crear el gráfico de pastel interactivo
    labels = ['Ingresos', 'Gastos']
    values = [ingresos, gastos]
    colors = ['royalblue', 'firebrick']

    fig = go.Figure(
        data=[go.Pie(labels=labels, values=values, marker=dict(colors=colors), textinfo='label+percent')]
    )

    fig.update_layout(
        title=f"Distribución de Ingresos y Gastos",
        template='plotly_white',
        width=400,  # Ajusta el ancho
        height=400  # Ajusta la altura
    )

    # Convertir el gráfico a HTML para incrustarlo en tu app
    return fig.to_html(full_html=False)

def graficar_barras_categorias_dinamico(transacciones):
    if not transacciones:  # Verificar si las transacciones están vacías
        return None

    # Crear un DataFrame a partir de las transacciones
    df = pd.DataFrame(transacciones, columns=['Fecha', 'Tipo', 'Monto', 'Categoría'])

    # Filtrar ingresos y gastos por categorías
    ingresos_df = df[df['Tipo'] == 'ingreso']
    gastos_df = df[df['Tipo'] == 'gasto']

    # Agrupar por categoría y sumar los montos
    ingresos_categoria = ingresos_df.groupby('Categoría')['Monto'].sum().reset_index()
    ingresos_categoria['Tipo'] = 'Ingreso'

    gastos_categoria = gastos_df.groupby('Categoría')['Monto'].sum().reset_index()
    gastos_categoria['Tipo'] = 'Gasto'

    # Combinar en un solo DataFrame para el gráfico
    categorias_df = pd.concat([ingresos_categoria, gastos_categoria])

    # Crear el gráfico interactivo
    fig = px.bar(
        categorias_df,
        x='Categoría',
        y='Monto',
        color='Tipo',
        barmode='group',
        title='Distribución de Ingresos y Gastos por Categoría',
        labels={'Monto': 'Monto ($)', 'Categoría': 'Categoría'},
        template='plotly_white'
    )
    # Ajustar tamaño del gráfico
    fig.update_layout(
        width=600,  # Ajusta el ancho
        height=400  # Ajusta la altura
    )

    # Convertir el gráfico en HTML para incrustarlo en tu app
    return fig.to_html(full_html=False)


def regresion_gastos(datos):
    """
    Realiza la regresión lineal de los gastos contra el tiempo.

    Args:
      datos (DataFrame): DataFrame con los datos de las transacciones.

    Returns:
      tuple:  (grafico_regresion_html, ecuacion_regresion)
    """
    # Prepare the data for linear regression
    X = datos[['Tiempo']]
    y = datos['Gastos']

    # Fit the linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Obtener la ecuación de la regresión
    ecuacion_regresion = f"Gastos = {model.intercept_:.2f} + {model.coef_[0]:.2f} * Tiempo"

    # Create the Plotly interactive plot
    fig_regresion = px.scatter(datos, x='Tiempo', y='Gastos', title='Regresión Lineal de Gastos vs. Tiempo', trendline="ols", trendline_color_override="red")

    # Customize the plot (optional)
    fig_regresion.update_traces(marker=dict(size=8, color='blue'))
    fig_regresion.update_layout(
        xaxis_title="Tiempo (días desde la primera transacción)",
        yaxis_title="Gastos",
        showlegend=True,
    )

    # Convertir el gráfico a HTML
    grafico_regresion_html = pio.to_html(fig_regresion, full_html=False)

    return grafico_regresion_html, ecuacion_regresion


def regresion_balance(datos):
    """
    Realiza la regresión lineal del balance contra el tiempo.

    Args:
      datos (DataFrame): DataFrame con los datos de las transacciones.

    Returns:
      tuple: (grafico_regresion_balance_html, ecuacion_regresion_balance)
    """
    # Prepare the data for linear regression (Balance vs Tiempo)
    X = datos[['Tiempo']]  # La variable independiente sigue siendo 'Tiempo'
    y = datos['Balance']   # Ahora la variable dependiente es 'Balance'

    # Fit the linear regression model
    model_balance = LinearRegression()  # Un nuevo modelo para el balance
    model_balance.fit(X, y)

    # Obtener la ecuación de la regresión del balance
    ecuacion_regresion_balance = f"Balance = {model_balance.intercept_:.2f} + {model_balance.coef_[0]:.2f} * Tiempo"

    # Create the Plotly interactive plot for Balance vs Tiempo
    fig_regresion_balance = px.scatter(datos, x='Tiempo', y='Balance', 
                                   title='Regresión Lineal del Balance vs. Tiempo', 
                                   trendline="ols", trendline_color_override="green")

    # Customize the plot (optional)
    fig_regresion_balance.update_traces(marker=dict(size=8, color='blue'))
    fig_regresion_balance.update_layout(
        xaxis_title="Tiempo (días desde la primera transacción)",
        yaxis_title="Balance",
        showlegend=True,
    )

    # Convertir el gráfico a HTML
    grafico_regresion_balance_html = pio.to_html(fig_regresion_balance, full_html=False) 

    return grafico_regresion_balance_html, ecuacion_regresion_balance

def procesar_datos(filepath):
    datos = pd.read_csv(filepath)
    # Limpiar y procesar datos
    datos['Ingreso'] = datos['Ingreso'].fillna(0)
    datos['Gastos'] = datos['Gastos'].fillna(0)
    datos['Fecha'] = pd.to_datetime(datos['Fecha'])
    datos = datos.sort_values('Fecha')
    datos['Balance'] = (datos['Ingreso'] - datos['Gastos']).cumsum()
    

    # Obtener el balance total final (último valor de la serie)
    balance_actual = datos['Balance'].iloc[-1]
    
    # Filtrar los gastos  <--- Agregar esta línea
    gastos_df = datos[datos['Gastos'] > 0]

    # Guardar datos procesados
    filepath_result = os.path.join(app.config['UPLOAD_FOLDER'], 'transacciones_balance.csv')
    datos.to_csv(filepath_result, index=False)

    # Calcular las medidas de tendencia central para los gastos
    media_gastos = gastos_df['Gastos'].mean()

    # Contar la frecuencia de cada categoría de gastos
    frecuencia_categorias = gastos_df['Categoría'].value_counts().reset_index()
    frecuencia_categorias.columns = ['Categoría', 'Frecuencia']

    # Crear el gráfico de barras con Plotly
    fig = px.bar(
        frecuencia_categorias, 
        x='Categoría', 
        y='Frecuencia',
        title='Frecuencia de Categorías de Gastos',
        labels={'Frecuencia': 'Número de Transacciones'},
        template='plotly_white'
    )

    # Convertir el gráfico a HTML
    grafico_frecuencia_html = pio.to_html(fig, full_html=False)  # Usar pio.to_html()


    # Gráficos interactivos
    monthly_data = datos.groupby(datos['Fecha'].dt.to_period('M').astype(str)).agg({'Ingreso': 'sum', 'Gastos': 'sum'})

    fig_barras = px.bar(monthly_data, x=monthly_data.index, y=['Ingreso', 'Gastos'],
                        barmode='group', title='Ingresos vs Gastos por Mes')
    grafico_barras_html = pio.to_html(fig_barras, full_html=False)  # Usar pio.to_html()

    ingresos = datos[datos['Ingreso'] > 0]
    gastos = datos[datos['Gastos'] > 0]
    ingresos_por_categoria = ingresos.groupby('Categoría')['Ingreso'].sum().reset_index()
    gastos_por_categoria = gastos.groupby('Categoría')['Gastos'].sum().reset_index()

    fig_pie_ingresos = px.pie(ingresos_por_categoria, values='Ingreso', names='Categoría',
                              title='Distribución de Ingresos por Categoría',
                              color_discrete_sequence=px.colors.sequential.RdBu)
    grafico_ingresos_html = pio.to_html(fig_pie_ingresos, full_html=False)  # Usar pio.to_html()

    fig_pie_gastos = px.pie(gastos_por_categoria, values='Gastos', names='Categoría',
                            title='Distribución de Gastos por Categoría',
                            color_discrete_sequence=px.colors.sequential.BuGn)
    grafico_gastos_html = pio.to_html(fig_pie_gastos, full_html=False)  # Usar pio.to_html()

    # Create a numerical representation of time for regression
    datos['Tiempo'] = (datos['Fecha'] - datos['Fecha'].min()).dt.days

    

    # --- Regresiones Lineales ---
    grafico_regresion_html, ecuacion_regresion = regresion_gastos(datos)
    grafico_regresion_balance_html, ecuacion_regresion_balance = regresion_balance(datos)
    # --- Fin Regresiones Lineales ---

    # Agregar estos resultados al diccionario
    resultados = {
        'media_gastos': media_gastos,
        'grafico_frecuencia': grafico_frecuencia_html,
        'balance_actual': balance_actual,
        'grafico_barras': grafico_barras_html,
        'grafico_ingresos': grafico_ingresos_html,
        'grafico_gastos': grafico_gastos_html,
        'ecuacion_regresion': ecuacion_regresion,
        'grafico_regresion': grafico_regresion_html,
        'ecuacion_regresion_balance':ecuacion_regresion_balance,
        'grafico_regresion_balance': grafico_regresion_balance_html
        
    }
    
    return resultados, filepath_result


# Rutas de la Aplicación
@app.route('/')
def index():
    # Aquí supongo que `transacciones` es una lista con formato:
    # [(fecha, tipo, monto, categoría), ...]
    
    # Procesar transacciones para obtener balances
    resultado = procesar_transacciones(transacciones)
    balance_acumulado = resultado['balance_acumulado']
    balance = resultado['balance']

    # Mensaje basado en el balance
    if balance > 0:
        mensaje_balance = "¡Felicidades! Tu balance es positivo. Sigue ahorrando y gestionando bien tus finanzas."
    elif balance < 0:
        mensaje_balance = f"Tu balance es negativo. Considera reducir tus gastos y revisar tu presupuesto. <br> Te recomendamos visites el siguente link"
    else:
        mensaje_balance = "Estas en ceros!!!, comienza a agregar tus transacciones diarias."

    # Gráficos dinámicos
    img_finanzas = graficar_finanzas_dinamico(transacciones)
    img_categorias = graficar_barras_categorias_dinamico(transacciones)

    # Renderizar plantilla con datos
    return render_template(
        'index.html',
        resultados=resultados,
        transacciones=transacciones,
        balance_acumulado=balance_acumulado,
        
        img_finanzas=img_finanzas,
        img_categorias=img_categorias,
        balance=balance,
        mensaje_balance=mensaje_balance
    )


@app.route('/agregar', methods=['POST'])
def agregar():
    """Agrega una nueva transacción desde un formulario."""
    try:
        fecha = request.form.get('fecha')
        tipo = request.form.get('tipo').lower()
        monto = float(request.form.get('monto', 0))
        categoria = request.form.get('categoria').lower()

        if tipo not in ["ingreso", "gasto"]:
            return "Error: El tipo debe ser 'ingreso' o 'gasto'.", 400
        if categoria not in CATEGORIAS_VALIDAS:
            return "Error: Categoría inválida.", 400
        if monto <= 0:
            return "Error: El monto debe ser mayor que 0.", 400

        agregar_transaccion(fecha, tipo, monto, categoria)
        return redirect(url_for('index'))
    except ValueError:
        return "Error: El monto debe ser un número válido.", 400
    
@app.route('/descargar_transacciones')
def descargar_transacciones():
    """Genera un archivo CSV con las transacciones y lo envía al usuario."""
    global df  # Asegúrate de que df esté accesible

    # Crear un archivo CSV en memoria
    csv_output = df.to_csv(index=False)  # index=False para no incluir el índice en el CSV

    # Enviar el archivo CSV como descarga
    return send_file(
        io.BytesIO(csv_output.encode()),
        mimetype="text/csv",
        as_attachment=True,
        download_name="mis_transacciones.csv"
    )

@app.route('/descargar-ejemplo')
def descargar_ejemplo():
    ruta_archivo = 'static/ejemplo.csv'  # Ruta al archivo CSV de ejemplo
    return send_file(ruta_archivo, as_attachment=True)

# Ruta para manejar el archivo subido
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            resultados, filepath_result = procesar_datos(filepath)
            if not resultados:  # Verificar si resultados está vacío
                return "Error: No se generaron resultados.", 500 
        except Exception as e:
            resultados = {"error": f"Ocurrió un error al procesar los datos: {str(e)}"}
            filepath_result = None   
        
        return render_template('resultados.html', resultados=resultados, balance_actual=resultados['balance_actual'],filepath_result=filepath_result)
       
    return "Archivo no permitido", 400


@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=True)


# Ejecutar la aplicación
if __name__ == '__main__':
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
