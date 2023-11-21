import { Button } from "@/shared/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UnAuthPage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex justify-center items-start flex-col gap-y-4 bg-white w-fit p-4 rounded-lg shadow-md">
                <div className="flex items-end gap-x-4">
                    <AlertTriangle color="red"  size={40}/>
                    <h1 className="text-xl font-bold tracking-tight">Не доступно!</h1>
                </div>
                <span className="text-gray-700">Вы не вошли в аккаунт, поэтому эта страница вам не доступна</span>
                <Button className="w-full" size='lg' onClick={() => navigate('/auth')}>Войти в аккаунт</Button>
            </div>
        </div>
    );
}