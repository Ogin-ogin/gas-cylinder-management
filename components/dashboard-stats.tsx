// ...統計表示コンポーネント雛形...
export default function DashboardStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">総ボンベ数: --</div>
      <div className="bg-white p-4 rounded shadow">低残圧ボンベ数: --</div>
      <div className="bg-white p-4 rounded shadow">期限間近ボンベ数: --</div>
    </div>
  );
}
