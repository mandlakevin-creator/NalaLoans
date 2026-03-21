import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  FileText,
  LogOut,
  Settings,
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch user's loans
  const { data: loans, isLoading: loansLoading } = trpc.loans.getLoans.useQuery();

  // Fetch user's applications
  const { data: applications, isLoading: applicationsLoading } = trpc.applications.getApplications.useQuery();

  // Fetch user profile
  const { data: profile } = trpc.profile.getProfile.useQuery();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-background sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="loans">My Loans</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Active Loans Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Active Loans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{loans?.filter((l) => l.status === "active").length || 0}</div>
                  <p className="text-xs text-muted-foreground mt-1">Loans currently active</p>
                </CardContent>
              </Card>

              {/* Total Borrowed Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    Total Borrowed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    R
                    {(
                      loans?.reduce((sum, loan) => sum + Number(loan.principal), 0) || 0
                    ).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Across all loans</p>
                </CardContent>
              </Card>

              {/* Total Paid Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Total Repaid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    R
                    {(
                      loans?.reduce((sum, loan) => sum + Number(loan.amountPaid || 0), 0) || 0
                    ).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Amount repaid so far</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest loans and applications</CardDescription>
              </CardHeader>
              <CardContent>
                {loansLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : loans && loans.length > 0 ? (
                  <div className="space-y-4">
                    {loans.slice(0, 3).map((loan) => (
                      <div key={loan.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Loan #{loan.id}</p>
                            <p className="text-sm text-muted-foreground">
                              R{Number(loan.principal).toLocaleString()} • {loan.status}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R{Number(loan.monthlyInstallment).toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Monthly</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No loans yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Loans Tab */}
          <TabsContent value="loans" className="space-y-6">
            {loansLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : loans && loans.length > 0 ? (
              <div className="grid gap-4">
                {loans.map((loan) => (
                  <Card key={loan.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Loan #{loan.id}
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                loan.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : loan.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {loan.status}
                            </span>
                          </CardTitle>
                          <CardDescription>
                            Started on {new Date(loan.startDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Principal</p>
                          <p className="text-lg font-semibold">R{Number(loan.principal).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Payment</p>
                          <p className="text-lg font-semibold">R{Number(loan.monthlyInstallment).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Repayment</p>
                          <p className="text-lg font-semibold">R{Number(loan.totalRepayment).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Paid So Far</p>
                          <p className="text-lg font-semibold">R{Number(loan.amountPaid || 0).toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Repayment Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {loan.paymentsCompleted}/{loan.totalPayments} payments
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{
                              width: `${((loan.paymentsCompleted || 0) / loan.totalPayments) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {loan.status === "active" && (
                        <div className="flex gap-2 pt-4">
                          <Button className="flex-1 bg-primary hover:bg-primary/90">
                            Make Payment
                          </Button>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No active loans yet</p>
                  <Button className="bg-primary hover:bg-primary/90">Apply for a Loan</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {applicationsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : applications && applications.length > 0 ? (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <Card key={app.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Application #{app.id}
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${
                                app.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : app.status === "rejected"
                                    ? "bg-red-100 text-red-800"
                                    : app.status === "under_review"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {app.status}
                            </span>
                          </CardTitle>
                          <CardDescription>
                            Submitted on {new Date(app.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Requested Amount</p>
                          <p className="text-lg font-semibold">
                            R{Number(app.requestedAmount).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Period</p>
                          <p className="text-lg font-semibold">{app.requestedPeriodDays} days</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Risk Level</p>
                          <p className="text-lg font-semibold capitalize">{app.riskLevel || "N/A"}</p>
                        </div>
                      </div>

                      {app.status === "rejected" && app.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-red-900 mb-1">Rejection Reason</p>
                          <p className="text-sm text-red-800">{app.rejectionReason}</p>
                        </div>
                      )}

                      {app.status === "approved" && (
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Proceed to Disbursal
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">No applications yet</p>
                  <Button className="bg-primary hover:bg-primary/90">Start New Application</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your account details and verification status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Full Name</p>
                    <p className="font-medium">{profile?.name || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{profile?.email || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{profile?.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">ID Number</p>
                    <p className="font-medium">{profile?.idNumber || "Not provided"}</p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold mb-4">Verification Status</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Email Verified", verified: profile?.emailVerified },
                      { label: "Phone Verified", verified: profile?.phoneVerified },
                      { label: "ID Verified", verified: profile?.idVerified },
                      { label: "Bank Verified", verified: profile?.bankVerified },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.verified ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
