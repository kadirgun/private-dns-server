import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/services/queries/settings";
import { Button, Fieldset, Flex, Group, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { memo, useEffect } from "react";

export const SettingsPage = memo(() => {
  const { data: settings } = useGetSettingsQuery();
  const { mutateAsync: updateSettings, isPending: updateSettingsLoading } = useUpdateSettingsMutation();

  const form = useForm<Settings>({
    initialValues: {
      dnsIPAddress: settings?.dnsIPAddress || "",
      dnsFallbackDoHDomain: settings?.dnsFallbackDoHDomain || "",
      startOnSystemStartup: settings?.startOnSystemStartup || false,
      startAsHidden: settings?.startAsHidden || false,
    },
  });

  useEffect(() => {
    if (!settings) return;
    form.setValues({ ...settings });
  }, [settings]);

  const handleSubmit = (values: Settings) => {
    updateSettings(values).then(() => {
      showNotification({
        title: "Settings updated",
        message: "Settings have been successfully updated",
        color: "teal",
      });
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap="sm">
        <Fieldset legend="General">
          <Flex direction="column" gap="sm">
            <Switch
              label="Start on system startup"
              key={form.key("startOnSystemStartup")}
              {...form.getInputProps("startOnSystemStartup")}
              checked={form.values.startOnSystemStartup}
            />
            <Switch
              label="Start as hidden"
              key={form.key("startAsHidden")}
              {...form.getInputProps("startAsHidden")}
              checked={form.values.startAsHidden}
            />
          </Flex>
        </Fieldset>

        <Fieldset legend="DNS Server">
          <TextInput
            label="Listen IP"
            placeholder="0.0.0.0"
            key={form.key("dnsIPAddress")}
            {...form.getInputProps("dnsIPAddress")}
          />
          <TextInput
            label="Fallback DOH"
            description="DoH server domain name using RFC 8484"
            placeholder="cloudflare-dns.com"
            mt="md"
            key={form.key("dnsFallbackDoHDomain")}
            {...form.getInputProps("dnsFallbackDoHDomain")}
          />
        </Fieldset>

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={updateSettingsLoading}>
            Submit
          </Button>
        </Group>
      </Flex>
    </form>
  );
});
