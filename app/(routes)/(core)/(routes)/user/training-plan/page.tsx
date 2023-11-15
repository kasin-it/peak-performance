import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function TrainingSchedulePage() {
    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
            <Card>
                <CardHeader>
                    <CardTitle>Monday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold">Meeting</h4>
                        <p className="text-sm text-gray-500">
                            10:00 AM - 11:00 AM
                        </p>
                        <p className="text-sm">Discuss project updates.</p>
                    </div>
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Tuesday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold">Workshop</h4>
                        <p className="text-sm text-gray-500">
                            2:00 PM - 4:00 PM
                        </p>
                        <p className="text-sm">Attend the design workshop.</p>
                    </div>
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Wednesday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Thursday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Friday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Saturday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Sunday</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 border-y py-4">
                    <Button size="sm">Add Event</Button>
                </CardContent>
            </Card>
        </div>
    )
}
export default TrainingSchedulePage
