import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import DeleteConfirmationDialog from "@/components/delete-confirmation-dialog";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const projects = [
    {
        id: "76b99e8a-4d5e-4818-92cb-7932a5b8f42a",
        title: "Belanja Perjalanan Dinas Biasa",
        description: "A web application for point of sale and inventory management.",
        status: "in progress",
        priority: "low",
        booked: "Rp 32.000.000",
        realisasi: "Rp 20.000.000",
        percentage: 32,
        assignDate: "01 Jan 2023",
        dueDate: "01 Jan 2024",
        isFavorite: true,
        icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />,
    },
    {
        id: "76b99e8a-4d5e-4818-92cb-7932a5b8f42a",
        title: "Lembur",
        description: "A web application for point of sale and inventory management.",
        status: "in progress",
        priority: "low",
        booked: "Rp 32.000.000",
        realisasi: "Rp 20.000.000",
        percentage: 32,
        assignDate: "01 Jan 2023",
        dueDate: "01 Jan 2024",
        isFavorite: true,
        icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />,
    },
    {
        id: "76b99e8a-4d5e-4818-92cb-7932a5b8f42a",
        title: "Belanja Jasa Profesi",
        description: "A web application for point of sale and inventory management.",
        status: "in progress",
        priority: "low",
        booked: "Rp 32.000.000",
        realisasi: "Rp 20.000.000",
        percentage: 32,
        assignDate: "01 Jan 2023",
        dueDate: "01 Jan 2024",
        isFavorite: true,
        icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />,
    },
    {
        id: "76b99e8a-4d5e-4818-92cb-7932a5b8f42a",
        title: "Paket Pertemuan Fullday/Halfday",
        description: "A web application for point of sale and inventory management.",
        status: "in progress",
        priority: "low",
        booked: "Rp 32.000.000",
        realisasi: "Rp 20.000.000",
        percentage: 32,
        assignDate: "01 Jan 2023",
        dueDate: "01 Jan 2024",
        isFavorite: true,
        icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />,
    },
    {
        id: "a91b39a7-0c96-4e7c-8fb1-2204d3d26d64",
        title: "Paket Meeting/Fullboard Dalam Kota",
        description: "A high-speed production management system built with Laravel.",
        status: "review",
        priority: "medium",
        realisasi: "Rp 20.000.000",
        booked: "Rp 32.000.000",
        percentage: 90,
        assignDate: "02 Feb 2023",
        dueDate: "02 Apr 2023",
        isFavorite: false,
        icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />,
    },
    {
        id: "a91b39a7-0c96-4e7c-8fb1-2204d3d26d64",
        title: "Paket Meeting/Fullboard Luar Kota",
        description: "A high-speed production management system built with Laravel.",
        status: "review",
        priority: "medium",
        realisasi: "Rp 20.000.000",
        booked: "Rp 32.000.000",
        percentage: 90,
        assignDate: "02 Feb 2023",
        dueDate: "02 Apr 2023",
        isFavorite: false,
        icon: <CheckBadgeIcon className="w-3.5 h-3.5 text-white" />,
    }
];

const prioritiesColorMap = {
    low: "green",
    medium: "yellow",
    high: "red",
};

export default function ProjectList() {
    const [open, setOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <Card key={project.id}>
                    <DeleteConfirmationDialog
                        open={open && selectedProject === project.id}
                        onClose={() => setOpen(false)}
                        onConfirm={async () => {
                            console.log("Deleted project:", project.title);
                            setOpen(false);
                        }}
                    />
                    <CardHeader className="flex-row items-center gap-3 border-none mb-0">
                        <div className={`w-10 h-10 z-50 grid place-content-center rounded-full border border-dashed border-primary dark:border-primary-foreground/60`}>
                            <span
                                className="z-40 h-8 w-8 rounded-full grid place-content-center bg-primary">
                                {project.icon}
                            </span>
                        </div>
                        <div className="flex-1">
                            {/* <Badge color={project.status === "in progress" ? "default" : "info"} variant="soft" className="capitalize">
                {project.status}
              </Badge> */}
                            <div className="text-base font-bold text-default-900 capitalize mb-1">{project.title}</div>
                        </div>
                        {/* <div className="flex-none cursor-pointer">
              {project.isFavorite ? (
                <Icon icon="heroicons:star-solid" className="text-yellow-400 w-[18px] h-[18px]" />
              ) : (
                <Icon icon="heroicons:star" className="text-default-400 w-[18px] h-[18px]" />
              )}
            </div> */}
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" className="h-6 w-6 bg-default-200 rounded-full hover:bg-default-300">
                                    <MoreHorizontal className="h-4 w-4 text-default-700" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[196px]" align="end">
                                <DropdownMenuItem className="cursor-pointer">View</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer" onSelect={() => { setSelectedProject(project.id); setOpen(true); }}>Delete</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </CardHeader>
                    <CardContent className="p-4 pt-0 pb-5">
                        {/* <div className="text-base font-semibold text-default-900 capitalize mb-1">{project.title}</div>
            <div className="text-xs font-medium text-default-600 max-h-[34px] overflow-hidden">{project.description}</div> */}
                        <div className="flex gap-4">
                            <div className="flex-1">
                                {/* <div className="text-sm font-medium text-default-900 mb-3">Booked:</div> */}
                                {/* <AvatarGroup max={3} total={project.assign.length} countClass="h-7 w-7">
                  {project.assign.map((name, index) => (
                    <Avatar className="h-7 w-7 ring-1 ring-background" key={index}>
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup> */}
                                <Card>
                                    <CardContent className="bg-orange-50 p-4 text-center flex flex-col gap-2">
                                        <p className="text-md font-semibold text-gray-600">Booked:</p>
                                        <p className="text-xl font-semibold text-orange-600">{project.booked}</p>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex flex-col flex-1">
                                {/* <div className="text-sm font-medium text-default-900 mb-3 text-right">Realisasi:</div> */}
                                {/* <Badge className="capitalize">
                  {project.priority}
                </Badge> */}
                                <Card>
                                    <CardContent className="bg-green-50 p-4 text-center flex flex-col gap-2">
                                        <p className="text-md font-semibold text-gray-600">Realisasi:</p>
                                        <p className="text-xl font-semibold text-green-600">{project.realisasi}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between mb-2">
                                <span className="text-sm font-medium text-default-900 capitalize">Presentase Realisasi:</span>
                                <span className="text-xs font-medium text-default-600">{project.percentage}%</span>
                            </div>
                            <Progress color="success" value={project.percentage} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                        <div>
                            {/* <div className="text-xs text-default-600 mb-[2px]">Assigned Date:</div>
                            <span className="text-xs font-medium text-default-900">{project.assignDate}</span> */}
                        </div>
                        <div>
                            {/* <div className="text-xs text-default-600 mb-[2px]">Due Date:</div>
                            <span className="text-xs font-medium text-default-900">{project.dueDate}</span> */}
                            <Link href="/detail" className="text-md font-semibold text-primary-700 mb-[2px] hover:underline">
                                Lihat Detail
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
