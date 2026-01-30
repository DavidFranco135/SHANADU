export const trayService = {
  fetchTrayBusinessContext: async (email: string) => {
    const res = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    if (!res.ok) throw new Error('Erro Tray');

    return await res.json();
  }
};
