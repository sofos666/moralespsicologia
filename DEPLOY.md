# 🚀 Despliegue en Vercel: Moralespsicologia

Tu proyecto ya está configurado para el dominio: `https://Moralespsicologia.vercel.app`.

## 1. Paso Final en GitHub (Manual)
Dado que no pude entrar a tu cuenta por restricciones de seguridad del navegador, haz esto:

1. Crea un repositorio en [GitHub.com](https://github.com/new) llamado: `Moralespsicologia`.
2. En tu terminal (PowerShell), pega estos comandos exactos:
   ```powershell
   git remote add origin https://github.com/cristianmoralesve/Moralespsicologia.git
   git branch -M main
   git push -u origin main
   ```

## 2. Conectar a Vercel
1. En [Vercel.com](https://vercel.com), importa el proyecto `Moralespsicologia`.
2. **IMPORTANTE**: En "Environment Variables", añade:
   - **Key**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://Moralespsicologia.vercel.app`

---
### ¿Por qué GitHub?
Aunque podrías subirlo directo, usar GitHub te permite tener un respaldo seguro de tu código y que Vercel se actualice solo cada vez que yo haga una mejora para ti.

### Imágenes y Datos
Todo está listo. Las fotos se sirven desde la carpeta `public` y los formularios ya saben que su casa es `Moralespsicologia`.

