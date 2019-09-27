from pathlib import Path


def main():
    Path('test/plugins').symlink_to('../src/plugins', target_is_directory=True)
    Path('sandbox/plugins').symlink_to('../src/plugins', target_is_directory=True)


if __name__ == '__main__':
    main()
